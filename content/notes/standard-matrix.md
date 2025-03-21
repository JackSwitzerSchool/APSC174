---
title: Standard Matrix of a Linear Transformation
type: note
category: linear-transformations
order: 4
tags:
  - linear-transformations
  - standard-matrix
  - matrices
  - basis
  - representation
publishedAt: '2025-02-26'
summary: "Understanding the standard matrix representation of linear transformations and how to construct it."
relatedContent: ["linear-transformations", "matrix", "vector-space", "null-space", "image-of-vector-space", "basis"]
subcategory: "transformations"
isPublished: true
weight: 20
---

## Definition
The **standard matrix** of a [[linear-transformations|linear transformation]] $T: \mathbb{R}^n \rightarrow \mathbb{R}^m$ is the matrix $A \in \mathbb{R}^{m \times n}$ such that for any vector $\vec{v} \in \mathbb{R}^n$:

$$T(\vec{v}) = A\vec{v}$$

This matrix represents the transformation relative to the standard bases of $\mathbb{R}^n$ and $\mathbb{R}^m$.

## Constructing the Standard Matrix

To find the standard matrix of a [[linear-transformations|linear transformation]] $T: \mathbb{R}^n \rightarrow \mathbb{R}^m$:

1. Let $\{\vec{e}_1, \vec{e}_2, \ldots, \vec{e}_n\}$ be the standard basis of $\mathbb{R}^n$, where $\vec{e}_i$ has 1 in the $i$-th position and 0 elsewhere.

2. Compute the images of each basis vector: $T(\vec{e}_1), T(\vec{e}_2), \ldots, T(\vec{e}_n)$.

3. Form the matrix $A$ by using these images as columns:
   $$A = \begin{bmatrix} T(\vec{e}_1) & T(\vec{e}_2) & \cdots & T(\vec{e}_n) \end{bmatrix}$$

That is, the $j$-th column of $A$ is the vector $T(\vec{e}_j)$.

## For General Vector Spaces

For [[linear-transformations|linear transformations]] between general [[vector-space|vector spaces]] $T: V \rightarrow W$ with chosen [[basis|bases]] $\mathcal{B}$ for $V$ and $\mathcal{C}$ for $W$, the process is similar:

1. Let $\mathcal{B} = \{\vec{v}_1, \vec{v}_2, \ldots, \vec{v}_n\}$ be a basis for $V$.

2. Compute the images: $T(\vec{v}_1), T(\vec{v}_2), \ldots, T(\vec{v}_n)$ in $W$.

3. Express each $T(\vec{v}_j)$ as a [[linear-combinations|linear combination]] of the basis vectors in $\mathcal{C}$.

4. Use the coefficients from these linear combinations to form the columns of the matrix.

## Examples

### Example 1: Reflection About the y-axis

Consider the transformation $T: \mathbb{R}^2 \rightarrow \mathbb{R}^2$ that reflects points about the y-axis.

The standard basis vectors of $\mathbb{R}^2$ are:
$$\vec{e}_1 = \begin{bmatrix} 1 \\ 0 \end{bmatrix} \quad \text{and} \quad \vec{e}_2 = \begin{bmatrix} 0 \\ 1 \end{bmatrix}$$

Under reflection about the y-axis:
$$T(\vec{e}_1) = \begin{bmatrix} -1 \\ 0 \end{bmatrix} \quad \text{and} \quad T(\vec{e}_2) = \begin{bmatrix} 0 \\ 1 \end{bmatrix}$$

Therefore, the standard matrix of $T$ is:
$$A = \begin{bmatrix} T(\vec{e}_1) & T(\vec{e}_2) \end{bmatrix} = \begin{bmatrix} -1 & 0 \\ 0 & 1 \end{bmatrix}$$

### Example 2: Linear Transformation Given by a Formula

Consider $T: \mathbb{R}^3 \rightarrow \mathbb{R}^2$ defined by:
$$T\begin{bmatrix} x \\ y \\ z \end{bmatrix} = \begin{bmatrix} 2x - y + 3z \\ x + 4y - z \end{bmatrix}$$

The standard basis vectors of $\mathbb{R}^3$ are:
$$\vec{e}_1 = \begin{bmatrix} 1 \\ 0 \\ 0 \end{bmatrix}, \quad \vec{e}_2 = \begin{bmatrix} 0 \\ 1 \\ 0 \end{bmatrix}, \quad \vec{e}_3 = \begin{bmatrix} 0 \\ 0 \\ 1 \end{bmatrix}$$

Computing the images:
$$T(\vec{e}_1) = \begin{bmatrix} 2 \\ 1 \end{bmatrix}, \quad T(\vec{e}_2) = \begin{bmatrix} -1 \\ 4 \end{bmatrix}, \quad T(\vec{e}_3) = \begin{bmatrix} 3 \\ -1 \end{bmatrix}$$

Therefore, the standard matrix is:
$$A = \begin{bmatrix} T(\vec{e}_1) & T(\vec{e}_2) & T(\vec{e}_3) \end{bmatrix} = \begin{bmatrix} 2 & -1 & 3 \\ 1 & 4 & -1 \end{bmatrix}$$

## Properties

1. **Linearity**: The standard matrix representation preserves all the properties of the original [[linear-transformations|linear transformation]].

2. **Composition**: If $T: U \rightarrow V$ and $S: V \rightarrow W$ are [[linear-transformations|linear transformations]] with standard matrices $A$ and $B$ respectively, then the standard matrix of the composition $S \circ T$ is the product $BA$.

3. **Inverse**: If $T: V \rightarrow V$ is invertible with standard matrix $A$, then the standard matrix of $T^{-1}$ is $A^{-1}$.

4. **Null Space and Image**: The [[null-space|null space]] and [[image-of-vector-space|image]] of the transformation $T$ correspond to the [[null-space|null space]] and [[image-of-vector-space|column space]] of its standard matrix $A$.

## Applications

1. **Geometric Transformations**: Standard matrices can represent rotations, reflections, projections, and other geometric transformations.

2. **Change of Basis**: When changing from one basis to another, the standard matrix helps transform the coordinates.

3. **Solving Systems**: The standard matrix allows us to convert problems about [[linear-transformations|linear transformations]] into problems about [[systems-of-linear-equations|systems of linear equations]].

4. **Computer Graphics**: Standard matrices are used to implement transformations in 2D and 3D graphics.

## Exercise
Find the standard matrix of the [[linear-transformations|linear transformation]] $T: \mathbb{R}^2 \rightarrow \mathbb{R}^3$ defined by:
$$T\begin{bmatrix} x \\ y \end{bmatrix} = \begin{bmatrix} x + 2y \\ 3x - y \\ x - y \end{bmatrix}$$

Then, find the [[null-space|null space]] and [[image-of-vector-space|image]] of $T$, and verify the Rank-Nullity Theorem. 