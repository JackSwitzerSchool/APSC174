---
title: Image of a Linear Transformation
type: note
category: linear-transformations
order: 3
tags:
  - linear-transformations
  - image
  - range
  - vector-space
  - matrices
publishedAt: '2025-02-25'
summary: "Understanding the image (range) of linear transformations and its properties as a subspace."
relatedContent: ["linear-transformations", "vector-space", "matrix", "null-space", "vector-space-dimension"]
subcategory: "transformations"
isPublished: true
weight: 19
---

## Definition
The **image** (or **range**) of a [[linear-transformations|linear transformation]] $T: V \rightarrow W$ is the set of all [[vectors|vectors]] in $W$ that are the result of applying $T$ to some vector in $V$:

$$\text{Im}(T) = \text{range}(T) = \{T(v) : v \in V\}$$

This is the set of all possible outputs of the transformation.

## Properties

1. **Subspace**: The image of a [[linear-transformations|linear transformation]] $T: V \rightarrow W$ is a [[vector-subspaces|subspace]] of $W$.

2. **Dimension**: The [[vector-space-dimension|dimension]] of the image is called the **rank** of $T$:
   $$\text{rank}(T) = \dim(\text{Im}(T))$$

3. **Surjectivity**: A [[linear-transformations|linear transformation]] $T$ is [[surjective|surjective]] (onto) if and only if $\text{Im}(T) = W$, i.e., the image is the entire codomain.
   - This means every vector in $W$ is the output of $T$ for some input
   - By the [[rank-nullity-theorem|Rank-Nullity Theorem]], $T$ can only be surjective if $\dim(V) \geq \dim(W)$

## Image of a Matrix

For a [[matrix|matrix]] $A \in \mathbb{R}^{m \times n}$, the image of $A$ is the set of all possible [[vectors|vectors]] $\vec{b} \in \mathbb{R}^m$ such that $A\vec{x} = \vec{b}$ for some $\vec{x} \in \mathbb{R}^n$:

$$\text{Im}(A) = \{\vec{b} \in \mathbb{R}^m : \vec{b} = A\vec{x} \text{ for some } \vec{x} \in \mathbb{R}^n\}$$

This corresponds to the image of the [[linear-transformations|linear transformation]] $T_A: \mathbb{R}^n \rightarrow \mathbb{R}^m$ defined by $T_A(\vec{x}) = A\vec{x}$.

### Finding the Image of a Matrix

To find a [[basis|basis]] for the image of a [[matrix|matrix]] $A$:

1. Transform $A$ into [[rref|row-reduced echelon form (RREF)]] using [[gaussian-elim|Gaussian elimination]].
2. Identify the pivot columns in the original matrix.
3. The columns of the original matrix corresponding to these pivot positions form a [[gen-sets|spanning set]] for the image.
4. If you need a [[basis|basis]], take only the linearly independent columns from this spanning set.

Alternatively, the image of $A$ is the [[vector-spans|span]] of the columns of $A$.

## Example

Consider the [[matrix|matrix]]:
$$A = \begin{bmatrix} 1 & 2 & 3 \\ 2 & 4 & 6 \end{bmatrix}$$

The [[rref|RREF]] of $A$ is:
$$\begin{bmatrix} 1 & 2 & 3 \\ 0 & 0 & 0 \end{bmatrix}$$

We see that only the first column is a pivot column. 

Therefore, a [[basis|basis]] for the image of $A$ is:
$$\left\{ \begin{bmatrix} 1 \\ 2 \end{bmatrix} \right\}$$

And the rank of $A$ is 1.

## Relationship with the Null Space

The image and [[null-space|null space]] of a [[linear-transformations|linear transformation]] are related through the **[[rank-nullity-theorem|Rank-Nullity Theorem]]**:

$$\dim(V) = \text{rank}(T) + \text{nullity}(T)$$

This fundamental relationship tells us that:
- The higher the rank (dimension of the image), the lower the nullity (dimension of the null space)
- The sum of these dimensions always equals the dimension of the domain
- A transformation cannot be both injective and surjective unless the domain and codomain have the same dimension

## Applications

1. **Systems of Linear Equations**: The image of a coefficient [[matrix|matrix]] represents the set of right-hand sides for which the system has a solution.

2. **Linear Transformations**: Understanding the image helps identify what vectors can be reached by a transformation.

3. **Change of Basis**: When changing basis, the image gives the range of possible representations in the new basis.

4. **Eigenspaces**: The image of $(A - \lambda I)$ is complementary to the eigenspace for eigenvalue $\lambda$.

## Exercise
Find a [[basis|basis]] for the image of the [[matrix|matrix]]:
$$B = \begin{bmatrix} 1 & 2 & 1 & 1 \\ 2 & 4 & 0 & 0 \\ 3 & 6 & 1 & 1 \end{bmatrix}$$

Determine the rank of $B$ and verify the Rank-Nullity Theorem. 