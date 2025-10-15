# Gitpod Migration to Dev Containers

## Summary

This project has been migrated from the legacy `.gitpod.yml` format to the modern **Dev Container** format, which is now the standard for Gitpod (Ona) environments.

## What Changed

### Old Format (`.gitpod.yml`)

The project previously used `.gitpod.yml` with:
- Custom task definitions for setup
- fnm (Fast Node Manager) installation
- Manual npm installations
- VS Code extension configuration

### New Format (Dev Container)

Now uses `.devcontainer/` with:
- **Dockerfile** - Defines the container image with all tools pre-installed
- **devcontainer.json** - Configures features, extensions, and settings

## Benefits of Dev Containers

1. **Standardization**: Dev containers are an open standard supported by VS Code, GitHub Codespaces, and Gitpod
2. **Better Performance**: Container images are pre-built and cached
3. **Reproducibility**: Exact same environment for all developers
4. **Easier Maintenance**: Declarative configuration with features
5. **Tool Integration**: Better integration with modern development tools

## Current Configuration

### `.devcontainer/Dockerfile`

```dockerfile
FROM mcr.microsoft.com/devcontainers/base:ubuntu-24.04

# Install GitHub CLI
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
        curl \
        gpg \
    && curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | gpg --dearmor -o /usr/share/keyrings/githubcli-archive-keyring.gpg \
    && echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | tee /etc/apt/sources.list.d/github-cli.list > /dev/null \
    && apt-get update \
    && apt-get -y install --no-install-recommends gh \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*
```

### `.devcontainer/devcontainer.json`

```json
{
  "name": "Ona",
  "build": {
    "context": ".",
    "dockerfile": "Dockerfile"
  },
  "features": {
    "ghcr.io/devcontainers/features/docker-in-docker": {
      "moby": false
    },
    "ghcr.io/devcontainers/features/node": {
      "nodeGypDependencies": true,
      "version": "lts",
      "nvmVersion": "latest"
    }
  },
  "customizations": {
    "vscode": {
      "extensions": [
        "DavidAnson.vscode-markdownlint",
        "usernamehw.errorlens"
      ]
    }
  }
}
```

## Features Included

### Pre-installed Tools

- **Node.js LTS** - Via nvm (automatically managed)
- **Docker-in-Docker** - For containerized workflows
- **GitHub CLI (gh)** - For PR creation and GitHub operations
- **Git** - Pre-configured with aliases

### VS Code Extensions

- **Markdown Linting** - DavidAnson.vscode-markdownlint
- **Error Lens** - usernamehw.errorlens

## Migration from `.gitpod.yml`

### Task Mapping

| Old (.gitpod.yml) | New (Dev Container) |
|-------------------|---------------------|
| `tasks.before` | Handled by Dockerfile RUN commands |
| `tasks.init` | Handled by features or postCreateCommand |
| `gitConfig` | Can be set in devcontainer.json or user settings |
| `vscode.extensions` | Moved to `customizations.vscode.extensions` |

### What Was Removed

1. **fnm installation** - Replaced by dev container Node.js feature
2. **Manual npm global installs** - Tools installed via Dockerfile or features
3. **Custom task runners** - Replaced by standard npm scripts

### What Was Added

1. **GitHub CLI** - Pre-installed for PR management
2. **Docker-in-Docker** - For advanced containerized workflows
3. **Standardized base image** - Ubuntu 24.04 with common tools

## Development Workflow

### Starting the Environment

When you open the project in Gitpod:
1. Dev container automatically builds (first time only)
2. All tools are pre-installed and ready
3. Run `npm install` to install project dependencies
4. Run `npm run dev` to start the development server

### Rebuilding the Container

If you modify `.devcontainer/` files:
1. Open Command Palette: `Ctrl+Shift+P`
2. Select: "Dev Containers: Rebuild Container"
3. Wait for rebuild to complete

## Compatibility

### Gitpod (Ona)

✅ Fully supported - Dev containers are the recommended format

### VS Code

✅ Fully supported - Install "Dev Containers" extension

### GitHub Codespaces

✅ Fully supported - Uses dev containers natively

### Local Development

✅ Supported - Requires Docker and VS Code with Dev Containers extension

## Troubleshooting

### Container Build Fails

- Check Dockerfile syntax
- Ensure all apt packages are available
- Verify network connectivity for downloads

### Extensions Not Loading

- Check extension IDs in devcontainer.json
- Rebuild container after changes
- Verify extensions are compatible with remote development

### Node.js Version Issues

- The Node.js feature automatically installs LTS version
- Use `.nvmrc` file to specify exact version if needed
- Feature respects nvm configuration

## References

- [Dev Containers Specification](https://containers.dev/)
- [Gitpod Dev Containers Documentation](https://www.gitpod.io/docs/configure/workspaces/workspace-image)
- [VS Code Dev Containers](https://code.visualstudio.com/docs/devcontainers/containers)

## Migration Date

**October 15, 2025**

The `.gitpod.yml` file has been removed as it's no longer needed with the dev container configuration.
