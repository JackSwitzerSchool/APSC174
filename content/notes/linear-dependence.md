---
title: "Linear Dependence"
type: "reference"
category: "course-content"
publishedAt: "2025-01-16"
summary: "Understanding when vectors can be expressed as linear combinations of other vectors."
tags: ["linear-dependence", "vectors", "linear-combinations"]
displayInNotes: true
order: 27
relatedContent: ["linear-combinations", "vector-spans", "basis"]
subcategory: "operations"
isPublished: true
weight: 27
---

## Definition
A set of vectors $\{v_1, v_2, \dots, v_n\}$ from a [[vector-space|Vector Space]] $\mathbb{V}$ is linearly dependent if there exist scalars $c_1, c_2, \dots, c_n$, not all zero, such that:

$$
c_1v_1 + c_2v_2 + \dots + c_nv_n = \mathbf{0}
$$

If no such scalars exist (or equivalently, if $c_1v_1 + c_2v_2 + \dots + c_nv_n = \mathbf{0}$ implies all $c_i = 0$), then the vectors are linearly independent.

### Visual Examples

<img 
  src="/assets/images/LinDep.png" 
  alt="Linearly Dependent Vectors Example" 
  width={600} 
  height={400} 
/>

<img 
  src="/assets/images/LinIndep.png" 
  alt="Linearly Independent Vectors Example" 
  width={600} 
  height={400} 
/>

## Examples
### In $\mathbb{R}^2$
Consider the vectors:
- $v_1 = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$
- $v_2 = \begin{pmatrix} 2 \\ 0 \end{pmatrix}$

These are linearly dependent because $2v_1 - v_2 = \mathbf{0}$

### In Polynomial Space
The polynomials $p_1(x) = x^2 + x$ and $p_2(x) = x^2 + x - 1$ are linearly independent because no non-zero scalar multiple of one equals the other.

## Properties
1. Any set of vectors containing $\mathbf{0}$ is linearly dependent
2. Any set containing a vector that's a [[linear-combinations|linear combination]] of others is dependent
3. A single non-zero vector is always linearly independent
4. Adding a vector to a linearly independent set might create dependence

## Why Do We Care?
Linear independence helps us:
1. Find [[basis|bases]] for vector spaces
2. Determine minimal generating sets
3. Calculate dimensions of spaces
4. Solve systems of equations efficiently

Think of linear independence as a way to identify when vectors are truly "different" from each other - when none can be created from combinations of the others.

## Exercise
Prove that if $\{v_1, v_2, \dots, v_n\}$ is linearly dependent, then one of the vectors can be written as a linear combination of the others. 