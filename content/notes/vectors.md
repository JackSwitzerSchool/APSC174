---
title: "Vectors"
type: "reference"
category: "course-content"
publishedAt: "2025-01-16"
summary: "Introduction to vectors, their properties, and operations in linear algebra."
tags: ["vectors", "linear-algebra", "foundations"]
displayInNotes: true
order: 15
relatedContent: ["vector-space", "vector-operations", "linear-combinations"]
subcategory: "foundations"
isPublished: true
weight: 15
---

## Definition
A vector is an element of a [[vector-space|Vector Space]]. While you may be familiar with vectors as "arrows" in $\mathbb{R}^2$ or $\mathbb{R}^3$, the concept is much more general.

## Common Examples
1. **Geometric Vectors**: Points/arrows in $\mathbb{R}^n$
   $$v = \begin{pmatrix} v_1 \\ v_2 \\ \vdots \\ v_n \end{pmatrix}$$

2. **Polynomials**: Elements of polynomial space
   $$p(x) = a_0 + a_1x + a_2x^2 + \dots + a_nx^n$$

3. **Functions**: Elements of function spaces
   $$f: \mathbb{R} \to \mathbb{R}$$

4. **Matrices**: Elements of matrix spaces
   $$A = \begin{pmatrix} a_{11} & a_{12} \\ a_{21} & a_{22} \end{pmatrix}$$

## Operations
Vectors can be:
1. Added together ([[linear-combinations|linearly combined]])
2. Multiplied by scalars
3. Combined to make [[vector-spans|spans]]
4. Used to generate [[vector-subspaces|subspaces]]

## Why So General?
The power of linear algebra comes from treating very different objects (polynomials, functions, matrices) as "vectors". This lets us:
1. Use the same tools across different areas of math
2. Find patterns between seemingly unrelated problems
3. Solve complex problems by breaking them into linear pieces

Think of vectors as the "things" in your vector space that you can add and scale - whatever those "things" might be!

## Exercise
Show that the set of all polynomials of degree ≤ 2 forms a vector space. What are the vectors in this space?
