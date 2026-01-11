/**
 * MCP Server Integration Module
 * Central export point for all MCP server configurations and database integrations
 *
 * Constitutional compliance: 100% TypeScript, no any types
 */

// Export all types
export * from './types';

// Export server configurations
export * from './server-configs';

// Export registry
export * from './registry';

// Database MCP integration exports
export {
  DATABASE_MCP_REGISTRY,
  getDatabaseMcpConfig,
  generateConnectionString,
  generateMcpServerConfig,
  generateEnvTemplate,
  validateDatabaseMcpRequirements,
  getDatabaseMcpPackages,
  generateMcpSetupDocs,
  hasMcpSupport,
  getMcpServerName,
  type DatabaseMcpPackage,
  type DatabaseEnvConfig,
  type DatabaseMcpConfig
} from './database-integration';
