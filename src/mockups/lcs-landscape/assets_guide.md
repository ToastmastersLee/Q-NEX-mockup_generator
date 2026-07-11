# LCS Mockup Image Assets Guide (Handover)

This document maps out the image feeds for the 7 channels, including the exact DALL-E/Midjourney prompts used for generation, positioning coordinates, and overall design aesthetics.

---

## 🎨 Design Theme & Aesthetic System
* **Style**: 2D Flat Vector Line Art / Minimalist Graphic Illustration.
* **Palette**: Monochromatic light blue-grey tones, charcoal outlines, white backgrounds.
* **Aspect Ratio**: Landscape format.
* **Objective**: Technical, clean diagrammatic view suitable for educational product manuals.

---

## 📹 Channel Definitions & Asset Mapping

### CH1: Lecture (课件PPT通道)
* **Role**: Educational presentation slide projected on the screen.
* **Asset Path**: `src/assets/ch1_ppt.png`
* **CSS Alignment**: `object-position: center; object-fit: cover;`
* **Generation Prompt**:
  > `A flat 2D vector illustration of a clean educational presentation slide on a projector screen, displaying simple block diagrams and flowcharts about 'INTRODUCTION TO ROBOTICS'. Minimalist line-art cartoon style, light blue, grey, and white color palette, match the illustration style of classroom_feed.png.`

---

### CH2: Lecture2 (Document Camera 展台通道)
* **Role**: Closeup desk camera showing textbooks, drawings, or manuals.
* **Asset Path**: `src/assets/ch2_doc_cam.png`
* **CSS Alignment**: `object-position: center; object-fit: cover;`
* **Generation Prompt**:
  > `A flat 2D vector illustration of a document camera view showing a desk surface from above, with a clean textbook open displaying text and a schematic of a robot. A hand holding a pencil is visible on the paper. Minimalist line-art cartoon style, light blue and grey tones, matching classroom_feed.png.`

---

### CH3: Teacher_C (老师特写通道)
* **Role**: Closeup view of the teacher lecturing.
* **Asset Path**: `src/assets/ch3_teacher_close.png`
* **CSS Alignment**: `object-position: center; object-fit: cover;`
* **Generation Prompt**:
  > `A flat 2D vector close-up illustration of a male teacher standing next to a whiteboard, holding a digital tablet and pointing at the board. Minimalist line-art cartoon style, light blue and grey tones, matching the illustration style of classroom_feed.png.`

---

### CH4: Student_C (学生特写通道 - 答题站立姿势)
* **Role**: Closeup of a student standing at their desk to answer a question.
* **Asset Path**: `src/assets/ch4_student_close.png`
* **CSS Alignment**: `object-position: center; object-fit: cover;`
* **Generation Prompt**:
  > `A flat 2D vector close-up illustration of a young male student in simple clothing standing up at his classroom desk to answer a question. Other students are visible sitting around him. Minimalist line-art cartoon style, light blue-grey tones, matching classroom_feed.png.`

---

### CH5: Teacher_P (老师全景通道)
* **Role**: Wide-angle panorama view of the teacher stage.
* **Asset Path**: `src/assets/classroom_feed.png`
* **CSS Alignment**: `object-position: right center; object-fit: cover;`
* **Concept**: Zoomed crop focusing on the right side of the main room scene.

---

### CH6: Student_P (学生全景通道)
* **Role**: Wide-angle view of the students sitting in the classroom.
* **Asset Path**: `src/assets/classroom_feed.png`
* **CSS Alignment**: `object-position: left center; object-fit: cover;`
* **Concept**: Zoomed crop focusing on the left half of the classroom.

---

### CH7: Interactive (互动/综合全景通道)
* **Role**: Full overview of the interactive room layout.
* **Asset Path**: `src/assets/classroom_feed.png`
* **CSS Alignment**: `object-position: center; object-fit: cover;`
* **Concept**: Full frame overview.
