FROM nginx:alpine

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Create directory for MFE assets
# The mfes directory will be mounted as a volume from the host
RUN mkdir -p /usr/share/nginx/html/mfes

# Expose port
EXPOSE 3002

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3002/health || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
