---
name: "performance-checker"
description: "Analyzes code for performance issues including memory leaks, inefficient algorithms, and optimization opportunities. Invoke when user asks for performance review, optimization, or detects slow code."
---

# Performance Checker

This skill performs comprehensive performance analysis on code to identify bottlenecks, inefficiencies, and potential issues.

## When to Invoke

Invoke this skill when:
- User asks for performance review or optimization
- User mentions code is running slow
- User wants to check for memory leaks
- Before deploying performance-critical code
- When analyzing large data processing code
- User asks about best practices for performance

## Performance Analysis Checklist

### 1. Algorithmic Complexity
- **Time Complexity**: Check for O(n²) or worse algorithms in loops
- **Nested Loops**: Identify unnecessary nested iterations
- **Data Structure Choice**: Verify appropriate data structures are used
- **Search Operations**: Ensure efficient search methods (hash maps vs arrays)

### 2. Memory Management
- **Memory Leaks**: 
  - Unremoved event listeners
  - Uncleared timers (setTimeout, setInterval)
  - Detached DOM references
  - Closure memory leaks
- **Large Object Creation**: Check for unnecessary object creation in loops
- **Caching**: Verify if expensive computations are cached properly

### 3. React Performance (if applicable)
- **Re-renders**: 
  - Missing React.memo for expensive components
  - Unnecessary prop changes
  - Inline function/object creation in render
- **useMemo/useCallback**: Check if expensive computations are memoized
- **List Rendering**: Verify proper key usage and virtualization for large lists
- **State Management**: Check for unnecessary state updates

### 4. Network & I/O
- **API Calls**: 
  - Duplicate requests
  - Missing request caching
  - No request cancellation on unmount
- **Bundle Size**: Large imports that could be code-split
- **Lazy Loading**: Check if lazy loading is used appropriately

### 5. DOM Performance
- **Layout Thrashing**: Multiple reads/writes causing reflows
- **Large DOM Trees**: Excessive DOM nodes
- **Event Handlers**: Too many delegated events vs individual handlers

### 6. JavaScript Performance
- **String Concatenation**: Use array.join() for multiple concatenations
- **Array Methods**: Prefer map/filter/reduce over for loops when appropriate
- **Object Property Access**: Cache deep property access in loops
- **JSON Operations**: Expensive parse/stringify operations

## Analysis Process

When analyzing code for performance issues:

1. **Identify Hot Paths**: Find frequently executed code
2. **Check Complexity**: Analyze algorithmic complexity
3. **Memory Analysis**: Look for memory leak patterns
4. **Framework-Specific**: Apply framework-specific checks (React, Vue, etc.)
5. **Bundle Analysis**: Check import patterns and bundle size
6. **Provide Recommendations**: Give specific, actionable optimization suggestions

## Output Format

Provide analysis in this structure:

```
## Performance Analysis Report

### 🔴 Critical Issues
- [Issue description with location]
  - Impact: [High/Medium/Low]
  - Recommendation: [Specific fix]

### 🟡 Optimization Opportunities
- [Optimization suggestion]
  - Current approach: [description]
  - Suggested approach: [description]
  - Expected improvement: [description]

### 🟢 Good Practices Found
- [What's already well-optimized]

### 📊 Metrics Estimation
- Time Complexity: [O(n), O(n²), etc.]
- Space Complexity: [O(n), O(1), etc.]
- Potential Bottlenecks: [list]

### 💡 Recommendations
1. [Priority 1 recommendation]
2. [Priority 2 recommendation]
3. [Priority 3 recommendation]
```

## Common Performance Patterns

### Anti-Patterns to Detect
```javascript
// ❌ Bad: O(n²) nested loop
for (let i = 0; i < arr.length; i++) {
  for (let j = 0; j < arr.length; j++) {
    // operation
  }
}

// ✅ Good: Use hash map for O(n)
const map = new Map();
for (let item of arr) {
  map.set(item.id, item);
}
```

```javascript
// ❌ Bad: Memory leak with event listener
useEffect(() => {
  window.addEventListener('resize', handleResize);
}, []);

// ✅ Good: Cleanup event listener
useEffect(() => {
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
```

```javascript
// ❌ Bad: Inline function creation in render
<Button onClick={() => handleClick(id)} />

// ✅ Good: Use useCallback
const memoizedHandler = useCallback(() => handleClick(id), [id]);
<Button onClick={memoizedHandler} />
```

## Tools and Metrics

When analyzing, consider:
- **Chrome DevTools Performance Tab**: For runtime performance
- **React DevTools Profiler**: For React component performance
- **Bundle Analyzers**: For bundle size optimization
- **Lighthouse**: For overall web performance

## Best Practices

1. **Measure First**: Always profile before optimizing
2. **Premature Optimization**: Avoid over-optimizing non-critical paths
3. **Trade-offs**: Consider readability vs performance
4. **Testing**: Verify optimizations with performance tests
5. **Monitoring**: Implement performance monitoring in production
