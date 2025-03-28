---
title: "Determinant"
type: "page"
category: "notes"
publishedAt: "2025-03-21"
summary: "Understanding determinants and their geometric meaning"
tags: ["determinant", "linear-transformations", "invertibility", "area", "volume"]
displayInNotes: true
order: 11
relatedContent: ["invertibility", "linear-transformations", "matrix-multiplication"]
subcategory: "linear-algebra"
isPublished: true
weight: 11
---

## What is a Determinant?

The determinant is a special number associated with a square matrix that tells us important information about the linear transformation represented by that matrix. It's a fundamental concept in linear algebra that connects geometry with algebra.

### Geometric Interpretation

The determinant of a 2×2 matrix represents the area scaling factor of the linear transformation:
- If the determinant is 2, the transformation doubles the area
- If the determinant is 0.5, the transformation halves the area
- If the determinant is negative, the transformation flips the orientation

For 3×3 matrices, the determinant represents the volume scaling factor.

### Connection to Invertibility

The determinant is intimately connected to [[invertibility|matrix invertibility]]:
- A matrix is invertible if and only if its determinant is non-zero
- This makes sense geometrically: if a transformation squishes space into a lower dimension (determinant = 0), we can't "unsquish" it back to its original form
- The determinant of the inverse matrix is the reciprocal of the original determinant: det(A⁻¹) = 1/det(A)

### Visual Understanding

For an excellent visual explanation of determinants, check out this video from 3Blue1Brown:
[![Determinant Video](https://img.youtube.com/vi/Ip3X9LOh2dk/0.jpg)](https://www.youtube.com/watch?v=Ip3X9LOh2dk)

### Properties

1. det(AB) = det(A) × det(B)
2. det(A⁻¹) = 1/det(A) (when A is invertible)
3. det(Aᵀ) = det(A)
4. det(cA) = cⁿ det(A) (where n is the dimension of the matrix)

### Calculation

For a 2×2 matrix:
```
|a b|
|c d|
```
The determinant is: ad - bc

For larger matrices, we can use cofactor expansion or row reduction techniques.

### Applications

- Determining if a system of linear equations has a unique solution
- Finding eigenvalues
- Computing volumes and areas in higher dimensions
- Understanding geometric transformations 