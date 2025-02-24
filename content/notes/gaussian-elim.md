---
title: Gaussian Elimination
type: note
category: matrices
order: 1
tags:
  - matrices
  - linear algebra
  - row operations
  - RREF
publishedAt: '2025-02-24'
summary: "A systematic procedure for solving systems of linear equations by transforming a matrix into row-reduced echelon form (RREF)."
relatedContent: ["matrix", "rref", "solving-systems-of-linear-equations"]
subcategory: "matrix operations"
isPublished: true
weight: 10
---

## Definition
Gaussian elimination is a systematic procedure for solving systems of linear equations by transforming the augmented [[matrix|matrix]] into [[rref|row-reduced echelon form (RREF)]].

## General Strategy
The general strategy to transform a [[matrix|matrix]] into its [[rref|Row-Reduced Echelon Form (RREF)]] follows these steps:

### Step 1
Go to the first row and turn the first non-zero entry into 1 (by dividing the entire row by that value). Then use this pivot to eliminate all other entries in that column by subtracting appropriate multiples of the first row from all other rows.

### Step 2
Move to the second row and turn the first non-zero entry into 1. Then eliminate all other entries in that column by subtracting appropriate multiples of the second row from all other rows.

### Step 3
Repeat this process for the remaining rows, working from left to right and top to bottom.

### Step 4
If necessary, swap rows to achieve the "staircase pattern" where each pivot (leading 1) appears to the right of the pivot in the row above it.

## Example
Consider the following system of linear equations:
$$
\begin{align}
2x + y - z &= 8 \\
-3x - y + 2z &= -11 \\
-2x + y + 2z &= -3
\end{align}
$$

The augmented [[matrix|matrix]] is:
$$
\begin{bmatrix}
2 & 1 & -1 & 8 \\
-3 & -1 & 2 & -11 \\
-2 & 1 & 2 & -3
\end{bmatrix}
$$

Applying Gaussian elimination:

1. Make the first pivot 1:
$$
\begin{bmatrix}
1 & 1/2 & -1/2 & 4 \\
-3 & -1 & 2 & -11 \\
-2 & 1 & 2 & -3
\end{bmatrix}
$$

2. Eliminate entries below the first pivot:
$$
\begin{bmatrix}
1 & 1/2 & -1/2 & 4 \\
0 & 1/2 & 1/2 & 1 \\
0 & 2 & 1 & 5
\end{bmatrix}
$$

3. Make the second pivot 1:
$$
\begin{bmatrix}
1 & 1/2 & -1/2 & 4 \\
0 & 1 & 1 & 2 \\
0 & 2 & 1 & 5
\end{bmatrix}
$$

4. Continue the process until [[rref|RREF]] is achieved:
$$
\begin{bmatrix}
1 & 0 & -1 & 3 \\
0 & 1 & 1 & 2 \\
0 & 0 & 1 & 1
\end{bmatrix}
$$

The solution is $x = 3, y = 2, z = 1$.

## Applications
Gaussian elimination is fundamental in:
- Solving systems of linear equations
- Finding the inverse of a [[matrix|matrix]]
- Computing determinants
- Finding the rank of a [[matrix|matrix]]
- Determining the basis of a vector space

For more information on the final form achieved through Gaussian elimination, see [[rref|Row-Reduced Echelon Form (RREF)]].
