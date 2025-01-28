---
title: "Set Union"
type: "reference"
category: "course-content"
publishedAt: "2025-01-11"
summary: "Understanding the union operation on sets and its properties."
tags: ["sets", "operations", "union"]
displayInNotes: true
order: 12
relatedContent: ["Sets", "Intersection", "Subset"]
subcategory: "operations"
isPublished: true
weight: 12
---

## Definition
The union of two [[Sets|sets]] $\mathbb{X}, \mathbb{Y}$ is the set of all elements that belong to $\mathbb{X}$ *or* $\mathbb{Y}$

Formally: 

$$
\mathbb{X} \cup \mathbb{Y} = \{ x : x \in \mathbb{X} \text{ or } x \in \mathbb{Y} \}
$$

This notion of "or" is foundational to computer programming and logic gates.

## Properties
For arbitrary sets: $\mathbb{X}, \mathbb{Y}, \mathbb{Z}$, and the [[Empty Set|empty set]] $\emptyset$:

i) $\mathbb{X} \cup \mathbb{X} = \mathbb{X}$

ii) $\mathbb{X} \cup \mathbb{Y} = \mathbb{Y} \cup \mathbb{X}$

iii) $\mathbb{X} \cup (\mathbb{Y} \cup \mathbb{Z}) = (\mathbb{X} \cup \mathbb{Y}) \cup \mathbb{Z}$

iv) $\mathbb{X} \cup \emptyset = \mathbb{X}$

## Example
Let $\mathbb{X}=\{a, b, c, d\}$, $\mathbb{Y}=\{a, e, f\}$

Then:

$$
\mathbb{X} \cup \mathbb{Y} = \{a, b, c, d, e, f\}
$$