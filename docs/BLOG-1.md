Our front-end architecture matches pretty well to what Michael Geers might characterize as an “app shell” with multi-level routing. At the foundational level, we lean heavily on standard open source software libraries and practices. For backend libraries, we use (among others) Fastify, NestJS, Pino, Restify and Undici. On the front-end, we utilize Vue.js and React.js.

All of our browser to backend connections go through Node microservices. These microservices are responsible for most of the middle-tier work you would expect in a distributed application. This includes data orchestration, business rule enforcement, and logical decisioning.

Of special note is how this architecture handles multi-level routing, page composition, and deployments.

Multi-Level Routing
Our top-level routing is heavily dependent on a specific URL pattern that includes:

mode: The JSON configuration to use for page composition.
domain: The organizational grouping for the functionality that follows.
container: A grouping of applications (or components) associated with a particular area of business functionality - where business functionality is something like “check a balance”. Likewise, containers are our fundamental unit of deployment.
app: An individual component or application needed to implement a particular area of business functionality. The “app” can be as large as complete SPA or as small as a page fragment needed.
resource: An actual resource for the application (JavaScript, Images, styles, etc.).
/ mode / domain / container / app / resource
With this routing structure, our “app shell” can easily parse the URLs to determine where to get assets and additional configuration. In addition to the “app shell” top-level routing, each micro-frontend utilizes its own router once a user enters it. In our case, this means the Vue.js or the React router, depending on the application in use.

Page Composition
We drive our page composition through simple JSON configurations and basic “outlets” (div tags) - this allows us to load micro-frontends into different parts of a single page.

The figure below shows a sample configuration mapped to HTML outlets for page composition.

This sample JSON configuration shows how specific components of the configuration map to the page composition elements in the HTML through standardized routing.
Notice that the “dashboard” and the “hotlists” modes have different base page layouts via the configuration shown - “hotlists” doesn’t need the sidebar-outlet or the footer-outlet.

A composed page might look like the following:

A sample page layout containing a header, sidebar, footer and finally the application in itself that has been composed from the configuration.
As can be seen in this screenshot, there are four visible micro-frontends on the screen. The “app shell”, which houses the overall router, loads all four applications, including:

Green: Page header.
Orange: The application which is the central focal point for the user.
Magenta: Sidebar that collapses when a user clicks on the blue arrow.
Purple: Page footer.
Deployments
All components can be individually deployed at any time, without impact to the rest of the system, using a proprietary, internal CI/CD pipeline that only requires one approval to deploy to production. This pipeline utilizes commercial tools to help us make sure our code and its dependencies are secure and properly licensed.

The following diagram shows one of many ways an application can be split and hosted. NGINX serves as a reverse proxy:

The same sample page's individual components can be hosted via different technologies in AWS and are brought together from the higher-level reverse proxy.
Lessons learned from building a micro-frontends architecture
At Capital One, this platform has allowed us to move much faster than before - we have gone from releasing two times a month to multiple daily releases. It has permitted up to 50 teams at a time to operate with only a moderate amount of technical and communication friction. And as mentioned above, we pivoted a lot in the design of this architecture. Along the way we learned some key lessons.

Lesson #1 - Build a foundation
In order to make our approach work, we had to put in a solid foundation to build on:

We created a single unifying design system (composed of web components) that allowed the platform to create the illusion of a “single application”.
We developed a standard CI/CD pipeline that allowed us to go from PR to deployment with just one approval.
We architected an overall business domain model that helped map components to the right teams.
We set up a system of open governance among the groups that participate in the platform, including weekly discussions on ways to improve.
We survey our software engineers and users about their experiences - and, we act on that feedback.
Lesson #2 - Developer experience should be lightweight and flexible
During our monolith days, developers would need to build and run the entire site to see their changes - we had to frequently recompile code, redeploy changes, and restart IIS.

As we moved into Node.js and associated technologies, we started by using Docker locally to match our production environment. While this provided the value of having the local environment match the production environment more closely, we also had to give up convenience features like hot-module replacement. When running a bunch of Docker containers in this fashion, our MacBooks tended to sound like small aircraft taking off!

Today we have a more developer-focused experience which allows for the use of native tooling to the developer experience. We use a custom “developer proxy” and NPM scripting that allows us to bring the application together from pieces on the developer’s individual workstations with pieces deployed elsewhere. This approach keeps our developer experience lightweight and, it allows the developer to have exactly what they need locally versus having to run the entire system:

Our learnings about the developer experience:

Use native tooling for the technologies in-use - Webpack Dev Server, Node.js servers for APIs, and hot reload functionality as needed.
Add “just enough” scripting or custom tooling to bring it all together to simulate the entire application as if it is running altogether.
Continue to invest in and refine the developer experience based on their feedback and usage patterns.