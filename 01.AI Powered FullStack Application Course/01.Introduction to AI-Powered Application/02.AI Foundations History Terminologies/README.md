# AI Foundations, History & Terminology

## Overview

AI is not magic or simply a chatbot. It is a way of building software systems that can **recognize patterns, make predictions, generate content, and support human decision-making**.

## 1. Intelligence

**Intelligence** is the ability to understand situations, connect ideas, learn from experience, and solve problems to achieve a goal.

* **Natural Intelligence:** Intelligence found in humans and animals, combining memory, reasoning, senses, emotions, creativity, and experience.
* **Artificial Intelligence:** The simulation of intelligent behavior using software, hardware, data, algorithms, and mathematical models.

AI is powerful at tasks such as pattern recognition, prediction, language processing, and working with large amounts of data, but it does not have human lived experience or genuine common sense in the same way humans do.

## 2. Brief History of AI

### 1950s: The Beginning

* **1950:** Alan Turing proposed the **Imitation Game (Turing Test)**.
* **1956:** The term **Artificial Intelligence** was introduced at the Dartmouth Conference.
* Early researchers focused heavily on **Symbolic AI**, using manually written rules and logic.

### AI Winters

Early rule-based systems struggled with the complexity and unpredictability of the real world. Limited computing power, expensive memory, and unmet expectations caused funding and interest to decline, leading to periods known as **AI Winters**.

### 2010s: Deep Learning Boom

Two major developments transformed AI:

* **Big Data:** Huge amounts of digital data became available for training models.
* **GPUs:** Powerful parallel processing made training neural networks much faster.

The focus shifted from manually programming rules toward systems that could **learn patterns from data**.

### 2017: Transformer Era

Google's paper **"Attention Is All You Need"** introduced the Transformer architecture. Transformers improved how models handle context and relationships within text and became the foundation of many modern Large Language Models (LLMs).

## 3. AI → ML → DL → Generative AI

Think of these as **nested circles**:

```text
Artificial Intelligence
└── Machine Learning
    └── Deep Learning
        └── Generative AI
```

* **AI:** The broad field of making computers perform tasks that appear intelligent.
* **Machine Learning (ML):** AI where systems learn patterns from data rather than relying entirely on manually written rules.
* **Deep Learning (DL):** ML using multi-layer neural networks, particularly effective with complex data such as images, audio, and text.
* **Generative AI:** Deep Learning systems capable of creating new content such as text, images, audio, and code.

## 4. AI Models

An **AI model** is the learned result of the training process. It is different from the algorithm, application, or API.

A simple analogy:

```text
Data + Training → Model → Inference → Output
```

A trained model contains learned patterns represented by large numbers of parameters. Developers commonly access hosted models through APIs instead of downloading the model itself.

## 5. Levels of AI

### ANI — Artificial Narrow Intelligence

AI designed for specific tasks. Most AI systems today fall into this category, including recommendation systems, navigation, facial recognition, voice assistants, and current LLMs.

### AGI — Artificial General Intelligence

A theoretical AI capable of performing a broad range of intellectual tasks at a human level, including reasoning, planning, learning, and adapting.

### ASI — Artificial Superintelligence

A theoretical form of AI that would surpass human intelligence across essentially all areas. It remains speculative.

### Foundation Models

Large, general-purpose models trained on broad datasets that can be adapted to many different tasks using prompts, tools, retrieved data, or fine-tuning.

## 6. Common Model Types

| Model Type           | Main Focus          | Examples of Uses                    |
| -------------------- | ------------------- | ----------------------------------- |
| **LLM**              | Text & code         | Chatbots, coding, summarization     |
| **Vision Model**     | Images & video      | Object detection, image analysis    |
| **Audio Model**      | Speech & sound      | Transcription, voice assistants     |
| **Multimodal Model** | Multiple data types | Understanding text + images + audio |

## 7. How LLMs Work

LLMs are essentially **token predictors**. Given a prompt and previous tokens, the model predicts the most likely next token and repeats this process to generate a response.

### Tokens

Text is broken into smaller units called **tokens**. A token can be a complete word, part of a word, punctuation, or other text unit.

Tokens matter because they affect:

* Cost
* Context limits
* Processing speed
* How much text a model can handle

### Context Window

The **context window** is the amount of information a model can consider in a single request. This can include instructions, conversation history, user input, retrieved documents, and examples.

### Temperature

**Temperature** controls how predictable or creative the model's output is.

* **Low:** More precise and predictable, useful for code and factual tasks.
* **Medium:** Balanced and conversational.
* **High:** More creative and varied, but potentially less reliable.

## 8. Hallucinations

An **AI hallucination** occurs when a model generates information that sounds confident but is incorrect, invented, or unsupported.

This happens because LLMs generate likely text rather than automatically verifying facts like a database. Models can even invent package names, functions, or APIs.

> **Key Developer Rule:** AI is a co-pilot, not the captain. Always understand, test, and verify AI-generated code and explanations.

## Key Takeaway

AI-powered applications are still **software applications**. The model is only one part of the system. Developers still need to build the **UI, backend, database, prompts, validation, testing, and user experience** around it.
