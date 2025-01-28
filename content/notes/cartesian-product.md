---
title: "Cartesian Product"
type: "reference"
category: "course-content"
publishedAt: "2025-01-11"
summary: "Understanding the cartesian product operation on sets and its applications."
tags: ["sets", "operations", "cartesian-product"]
displayInNotes: true
order: 14
relatedContent: ["Sets", "Union", "Intersection"]
subcategory: "operations"
isPublished: true
weight: 14
---

## Definition
The cartesian product of two [[Sets|sets]] $\mathbb{X}, \mathbb{Y}$ is an ordered pair $(x,y)$ where $x \in \mathbb{X}$ *and* $y \in \mathbb{Y}$

Formally: 

$$
\mathbb{X} \times \mathbb{Y} = \{ (x,y): x \in \mathbb{X} \text{ and } y \in \mathbb{Y}\}
$$

Note: $(2,5) \neq (5,2)$

## Example
Let $\mathbb{X}=\{1,2\}$ and $\mathbb{Y}=\{a,b,c\}$

Then: 

$$
\mathbb{X} \times \mathbb{Y} = \{(1,a),(1,b),(1,c),(2,a),(2,b),(2,c)\}
$$

and:

$$
\mathbb{Y} \times \mathbb{X} = \{(a,1),(a,2),(b,1),(b,2),(c,1),(c,2)\}
$$

In general, if 

$$
\mathbb{X} \neq \mathbb{Y} \Rightarrow \mathbb{X} \times \mathbb{Y} \neq \mathbb{Y} \times \mathbb{X}
$$

## So What?
If we take the cartesian product of the Real numbers with itself we get $\mathbb{R}^2$ or the 2 dimensional real plane. Intuitively, higher dimensional analogs of sets can be constructed using solely the base set as well as this Cartesian Product operation.

Formally: 

$$
\mathbb{R} \times \mathbb{R} = \mathbb{R}^2
$$