---
title: "Upgrading Casbin (Go) from v2 to v3: A Complete Migration Guide"
slug: upgrading-casbin-go-v2-to-v3
author: Yang Luo
authorURL: "http://github.com/hsluoyz"
authorImageURL: "https://avatars.githubusercontent.com/hsluoyz"
date: "2026-02-01"
tags: [casbin, go, migration, upgrade, v3]
---

If you're running Casbin v2 in production and wondering about the upgrade path to v3, this guide is for you. We'll cover everything you need to know about the transition, from understanding what changed to executing a safe production migration.

<!--truncate-->

## What Changed in v3?

The good news: **v3 is primarily a module path change with full backward compatibility**. The core authorization logic, APIs, and functionality remain unchanged. This was an intentional decision to minimize disruption while following Go's semantic versioning conventions.

### The Main Change: Module Path

The only breaking change in v3 is the Go module path:

```go
// v2
import "github.com/casbin/casbin/v2"

// v3
import "github.com/casbin/casbin/v3"
```

That's it. Your existing policies, models, and code logic don't need to change. The migration is mechanical: update import statements and your go.mod file.

### Why Release v3?

You might wonder why release a new major version for just an import path change. The answer is semantic versioning. Go's module system uses the major version number in the import path (`/v2`, `/v3`, etc.). This allows multiple major versions to coexist in the same dependency tree, which is crucial for large applications with many dependencies.

By releasing v3, we've:
- Aligned with Go's semantic import versioning
- Enabled gradual migration in complex dependency graphs
- Set the stage for future enhancements without breaking existing v2 users

## What Stayed the Same?

Everything else. Seriously.

- **All APIs remain identical** - `Enforce()`, `AddPolicy()`, `GetAllRoles()`, and every other method works exactly as before
- **Model and policy syntax unchanged** - Your existing `.conf` model files and `.csv` policy files work without modification
- **Adapter interface unchanged** - All existing adapters (PostgreSQL, MySQL, MongoDB, etc.) remain compatible
- **Performance characteristics** - No performance regressions or improvements; it's the same engine
- **Middleware integrations** - Your Gin, Echo, or other framework middleware continues to work

## New Features in v3

Since the v3.0.0 release on December 9, 2025, several new features have been added:

### v3.7.0+: Enhanced Logger Integration
You can now integrate custom loggers into Casbin's core enforcement and policy management operations, providing better observability:

```go
enforcer.SetLogger(yourCustomLogger)
```

### v3.8.0+: GetAllUsers() API
A new API to distinguish users from roles:

```go
users := enforcer.GetAllUsers()
```

This is particularly useful in RBAC systems where you need to list actual users separately from role definitions.

### v3.9.0+: Built-in Cycle Detection
The enforcer now includes automatic detection of cycles in role hierarchies, preventing infinite loops:

```go
// Automatically detects and prevents circular role assignments
enforcer.AddGroupingPolicy("alice", "admin")
enforcer.AddGroupingPolicy("admin", "alice") // Will be detected as a cycle
```

### v3.10.0+: Explain() API for AI-Powered Authorization Insights
The latest feature leverages LLM APIs to explain authorization decisions in natural language:

```go
explanation := enforcer.Explain("alice", "read", "data1")
// Returns: "Alice has read permission on data1 because she has the 'reader' role..."
```

This is particularly valuable for debugging complex policies and helping non-technical stakeholders understand authorization decisions.

## Migration Strategy

### For New Projects

Simple: just use v3 from the start.

```bash
go get github.com/casbin/casbin/v3
```

```go
import "github.com/casbin/casbin/v3"
```

### For Existing v2 Projects

The migration involves three steps:

#### Step 1: Update Your go.mod

```bash
go get github.com/casbin/casbin/v3
go mod tidy
```

#### Step 2: Update Import Statements

Find and replace all Casbin imports across your codebase:

```bash
# Using sed on Unix/Linux/Mac
find . -type f -name '*.go' -exec sed -i 's|github.com/casbin/casbin/v2|github.com/casbin/casbin/v3|g' {} +

# Or manually in your editor
# Find: github.com/casbin/casbin/v2
# Replace: github.com/casbin/casbin/v3
```

#### Step 3: Update Adapter Imports (If Applicable)

If you're using an adapter, check if it has been updated for v3. Most popular adapters have v3 versions:

```go
// Example: PostgreSQL Adapter
import "github.com/casbin/casbin-pg-adapter" // Check for v3 support

// Note: File Adapter is built-in and works with both v2 and v3
```

Check the adapter's repository for v3 compatibility. Most adapters work with both v2 and v3 since the adapter interface didn't change.

### Production Migration Strategies

For production systems, you have several options depending on your deployment model:

#### Strategy 1: Blue-Green Deployment (Recommended)

1. Deploy v3 to a staging environment
2. Run your full test suite
3. Monitor for any unexpected behavior
4. Deploy v3 to a subset of production instances
5. Gradually shift traffic
6. Decommission v2 instances once v3 is stable

This approach provides the safest migration with easy rollback.

#### Strategy 2: In-Place Upgrade

For smaller deployments or if blue-green isn't feasible:

1. Schedule maintenance window
2. Deploy v3 build
3. Monitor closely
4. Have v2 build ready for quick rollback if needed

#### Strategy 3: Shadow Mode Testing

If you have the infrastructure:

1. Run v3 alongside v2
2. Send duplicate requests to both
3. Compare authorization decisions
4. Once confident they're identical, cut over to v3

### Rollback Plan

If you need to rollback:

1. **Code level**: Revert import changes (use version control)
2. **Dependency level**: `go get github.com/casbin/casbin/v2@latest`
3. **Deploy**: Use your standard deployment process to revert

The beauty of this migration is that rollback is trivial - just revert the import changes and redeploy.

## Database and Adapter Considerations

### Do I Need to Migrate My Policy Database?

**No.** Your existing policy data remains unchanged. The policies are stored as simple strings (subject, object, action, etc.) and have no dependency on the Casbin version.

### Adapter Compatibility

The adapter interface between v2 and v3 is identical. This means:

- **Postgres Adapter**: Works with both v2 and v3
- **MySQL Adapter**: Works with both v2 and v3  
- **MongoDB Adapter**: Works with both v2 and v3
- **File Adapter**: Works with both v2 and v3
- **Any custom adapter**: Will work without modification

You can even run v2 and v3 applications against the same policy database simultaneously (though you typically wouldn't in production).

### What About Transactions During Migration?

Since v2 and v3 can share the same database:

1. Your v2 instances continue writing policies
2. Deploy v3 instances
3. Both read from the same policy store
4. No data migration or transformation needed
5. Decommission v2 when ready

This makes staged rollouts very straightforward.

## Testing Your Migration

### Automated Testing

Your existing tests should pass without modification:

```go
func TestPolicyEnforcement(t *testing.T) {
    // This test works identically in v2 and v3
    e, _ := casbin.NewEnforcer("model.conf", "policy.csv")
    
    ok, _ := e.Enforce("alice", "data1", "read")
    if !ok {
        t.Error("Expected alice to have read access to data1")
    }
}
```

### Integration Testing

Test your middleware integrations:

```go
// Example with Gin
import (
    "github.com/casbin/casbin/v3"
    casbinmiddleware "github.com/casbin/gin-casbin/v3"
)

// Your middleware should work identically
router.Use(casbinmiddleware.NewAuthorizer(enforcer))
```

### Load Testing

Run your standard load tests against the v3 build. Performance characteristics should be identical to v2.

### Policy Verification

Compare policy evaluation across versions:

```bash
# Export policies from v2
# Load into v3
# Run test cases against both
# Compare results
```

If you see any differences, it's likely a bug - please report it!

## Common Pitfalls and How to Avoid Them

### Pitfall 1: Mixed v2/v3 Dependencies

**Problem**: Some dependencies use Casbin v2, others use v3, causing conflicts.

**Solution**: This actually isn't a problem! Go's module system allows both v2 and v3 to coexist. They're treated as separate packages. However, for cleanliness, try to update all dependencies to v3 when possible.

### Pitfall 2: Adapter Version Mismatch

**Problem**: Using a v2 adapter with Casbin v3 (or vice versa).

**Solution**: Check your adapter's documentation. Most adapters support both versions. If uncertain, test in development first.

### Pitfall 3: Forgetting Internal Packages

**Problem**: Updated main application imports but forgot internal packages or tools.

**Solution**: Use `go mod graph` and `go mod why` to find all Casbin dependencies:

```bash
go mod graph | grep casbin
```

### Pitfall 4: Custom Adapter Compilation Issues

**Problem**: Custom adapter won't compile after upgrade.

**Solution**: The adapter interface didn't change, so this suggests an import issue. Check that all Casbin imports in your adapter use v3:

```go
import (
    "github.com/casbin/casbin/v3"
    "github.com/casbin/casbin/v3/persist"
)
```

## FAQ

### Q: Is v2 still maintained?

As of this writing, v2 receives critical bug fixes, but new features are developed for v3. Plan to migrate within the next 6-12 months.

### Q: Can I gradually migrate by having some services on v2 and others on v3?

Yes! They can even share the same policy database. This is one of the benefits of the minimal changes in v3.

### Q: Will my middleware (Gin, Echo, Fiber, etc.) work?

Yes, but check if the middleware has been updated for v3. Most popular middleware packages have v3 versions. The API is the same, just import paths change.

### Q: Do I need to update my .conf model files?

No. Model file syntax is unchanged.

### Q: Do I need to update my .csv policy files?

No. Policy file format is unchanged.

### Q: What about WatcherEx, FilteredAdapter, and other interfaces?

All interfaces remain unchanged. If your code implements these interfaces, no modifications needed (beyond import paths).

### Q: Performance impact?

None. v3 uses the same evaluation engine as v2.

### Q: Can I use v3 with Go 1.16?

Check the go.mod in the Casbin v3 repository for the minimum supported Go version. Generally, using the latest stable Go version is recommended.

## Migration Checklist

Use this checklist for your migration:

- [ ] **Pre-Migration**
  - [ ] Review current Casbin usage in your codebase
  - [ ] Check adapter compatibility for v3
  - [ ] Verify middleware support for v3
  - [ ] Review custom implementations (adapters, watchers, etc.)
  
- [ ] **Development Environment**
  - [ ] Update go.mod to use Casbin v3
  - [ ] Update all import statements
  - [ ] Update adapter imports if needed
  - [ ] Update middleware imports if needed
  - [ ] Run `go mod tidy`
  - [ ] Build successfully
  - [ ] Run all unit tests
  - [ ] Run integration tests
  
- [ ] **Staging Environment**
  - [ ] Deploy v3 build to staging
  - [ ] Verify policy loading
  - [ ] Run smoke tests
  - [ ] Run full test suite
  - [ ] Load testing
  - [ ] Monitor for issues
  
- [ ] **Production Migration**
  - [ ] Choose migration strategy (blue-green, in-place, shadow mode)
  - [ ] Prepare rollback plan
  - [ ] Schedule deployment (maintenance window if needed)
  - [ ] Deploy v3
  - [ ] Monitor error rates
  - [ ] Monitor latency
  - [ ] Verify authorization decisions
  - [ ] Monitor for 24-48 hours
  
- [ ] **Post-Migration**
  - [ ] Update documentation
  - [ ] Update CI/CD pipelines
  - [ ] Update developer guides
  - [ ] Archive v2 deployment artifacts
  - [ ] Celebrate! 🎉

## Real-World Migration Examples

### Example 1: Microservices Architecture

**Scenario**: 20 microservices using Casbin v2, shared PostgreSQL policy database.

**Approach**:
1. Updated one service at a time
2. Deployed to staging, tested, moved to production
3. All services shared the same policy database
4. Completed migration in 2 weeks with zero downtime

**Key insight**: The shared database approach made this seamless.

### Example 2: Monolith Application

**Scenario**: Single large application, file-based adapter.

**Approach**:
1. Updated all imports in one PR
2. Tested in staging for a week
3. Blue-green deployment to production
4. Monitored for 48 hours, cut over fully

**Key insight**: The mechanical nature of the change made it low-risk.

### Example 3: Multi-Tenant SaaS

**Scenario**: Multi-tenant application, tenant-specific policies in MySQL.

**Approach**:
1. Shadow deployed v3 alongside v2
2. Sent identical requests to both
3. Compared responses for 1 week
4. Found 100% identical results
5. Switched traffic to v3

**Key insight**: Shadow mode testing provided high confidence.

## Conclusion

Upgrading from Casbin v2 to v3 is one of the most straightforward major version upgrades you'll encounter. The changes are purely mechanical (import paths), the functionality is identical, and the migration can be done gradually with easy rollback.

**Key Takeaways**:
- ✅ Only import paths change, everything else is identical
- ✅ No database migration needed
- ✅ Can run v2 and v3 side-by-side
- ✅ Easy rollback if needed
- ✅ New features added in v3 (logger integration, cycle detection, Explain API)

**When to Migrate**:
- New projects: Use v3 immediately
- Existing projects: Migrate when convenient, but plan for within 6-12 months as v2 enters maintenance mode

**How Long Does It Take**:
- Small project: 15-30 minutes
- Medium project: 2-4 hours  
- Large project: 1-2 days for testing and staged rollout

If you have questions or run into issues during migration, the Casbin community is here to help:
- [GitHub Issues](https://github.com/casbin/casbin/issues)
- [Discord](https://discord.gg/S5UjpzGZjN)
- [Discussions](https://github.com/casbin/casbin/discussions)

Happy upgrading! 🚀
