---
title: "Matrix Invertibility"
type: "page"
category: "notes"
publishedAt: "2025-03-21"
summary: "Understanding when matrices can be inverted and their relationship to the identity matrix"
tags: ["invertibility", "identity-matrix", "linear-transformations", "determinant"]
displayInNotes: true
order: 12
relatedContent: ["determinant", "linear-transformations", "matrix-multiplication"]
subcategory: "linear-algebra"
isPublished: true
weight: 12
---

## What is Matrix Invertibility?

A matrix A is invertible if there exists another matrix B such that:
AB = BA = I

where I is the [[identity-matrix|identity matrix]]. In this case, we write B = A⁻¹ and call it the inverse of A.

### Key Properties

1. If A is invertible, its inverse is unique
2. (AB)⁻¹ = B⁻¹A⁻¹
3. (A⁻¹)⁻¹ = A
4. A matrix is invertible if and only if its [[determinant|determinant]] is non-zero

### Connection to Linear Transformations

A matrix represents an invertible linear transformation if and only if:
- It preserves the dimension of the space
- It maps distinct vectors to distinct vectors
- It can be "undone" by another transformation

### Connection to Systems of Equations

A matrix is invertible if and only if the system Ax = b has a unique solution for every b. This is why invertibility is crucial in solving systems of linear equations. 