# WEEK 1 RETROSPECTIVE

## Overview

This document captures **what I learned during Week 1** and **what broke along the way**, including mistakes, failures, and how they were resolved. The goal of this retro is to reflect honestly and identify improvements for the next week.

---

## Lessons Learned

### 1. Terminal Is a Core Engineering Skill

* Learned to navigate the system confidently using commands like `ls`, `cd`, `pwd`, `cat`, `less`, `grep`, `ps`, `top`, and `curl`.
* Understood that real debugging often happens in the terminal, not in an IDE.
* Realized that avoiding GUI tools forces deeper understanding of how the system works.

**Key takeaway:** If you can’t explain what a command does, you shouldn’t use it blindly.

---

### 2. Understanding PATH and Binary Resolution

* Learned what a *binary path* is and how the system finds executables using the `$PATH` variable.
* Used commands like `which node`, `echo $PATH`, and `whereis node`.
* Understood why commands fail with `command not found` errors.

**Key takeaway:** Environment variables control how programs are discovered and executed.

---

### 3. Node.js Runtime Behavior

* Learned how Node.js runs a file (`node server.js`) and what happens internally.
* Understood warnings like deprecation messages (e.g., `url.parse()` warning).
* Learned how to start, stop, and debug a running Node server.

**Key takeaway:** Warnings are signals for future bugs — not something to ignore.

---

### 4. HTTP Fundamentals via Real Experiments

* Used `curl` to inspect headers, status codes, and response bodies.
* Learned the difference between:

  * GET vs POST
  * Headers vs body
  * Cached vs non-cached responses
* Observed request/response behavior without relying on Postman.

**Key takeaway:** Tools like Postman are helpful, but understanding raw HTTP is essential.

---

### 5. Streams vs Buffers (Performance Mindset)

* Implemented file reading using both:

  * `fs.readFile` (Buffer)
  * `fs.createReadStream` (Stream)
* Observed memory usage and execution time differences.
* Learned why streams are better for large files.

**Key takeaway:** Performance problems are often invisible until you measure them.

---

### 6. Documentation Is Part of Engineering

* Learned to write `.md` files with proper structure.
* Added screenshots and explanations instead of just code.
* Understood that documentation is evaluated as seriously as implementation.

**Key takeaway:** If it’s not documented, it didn’t happen.

---

## What Broke (And Why)

### 1. Server Didn’t Start / Port Already in Use

**What broke:**

* Node server failed to start because the port was already occupied.

**Why it happened:**

* Previous Node process was still running.

**How it was fixed:**

* Identified the process using `lsof -i :3000` or `ps`.
* Killed the process and restarted the server.

---

### 2. Screenshots Not Showing in Markdown

**What broke:**

* Screenshots were not rendering in GitHub README/MD files.

**Why it happened:**

* Incorrect relative paths or screenshots not committed to the repo.

**How it was fixed:**

* Stored screenshots inside a folder (e.g., `screenshots/`).
* Used correct markdown syntax:

  ```md
  ![description](screenshots/filename.png)
  ```

---

### 3. Confusion Around Git Clone and Merge

**What broke:**

* Repository changes were not appearing as expected.

**Why it happened:**

* Incomplete understanding of how `git clone`, `git pull`, and merges work.

**How it was fixed:**

* Revisited the Git flow step-by-step.
* Documented merge conflicts and resolutions clearly in `.md` files.

---

### 4. API Misunderstandings

**What broke:**

* Confusion around pagination, headers, and caching requirements in API investigation.

**Why it happened:**

* Jumped to implementation before fully understanding the API behavior.

**How it was fixed:**

* Used `curl -I` and raw requests to inspect headers.
* Read responses carefully before coding.

---

### 5. Over-Reliance on Tools

**What broke:**

* Initial dependence on Postman without understanding the underlying request.

**Why it happened:**

* Habit of using GUI tools first.

**How it was fixed:**

* Forced myself to use `curl` and terminal-only debugging.

---

## Final Reflection

Week 1 was challenging but foundational. Most issues came from **gaps in fundamentals**, not lack of effort. Breaking things was part of the learning process, and each failure clarified how systems actually work.

**Overall outcome:** Stronger engineering mindset, better system understanding, and improved confidence working without GUI tools.
