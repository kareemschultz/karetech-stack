/**
 * MCP Server Integration Module
 * Central export point for all MCP server configurations
 *
 * Constitutional compliance: 100% TypeScript, no any types
 */

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
