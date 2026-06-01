// ═══════════════════════════════════════════════════════
//  Cambridge CS 9618 – Full Study App
//  All 29 chapters · Diagram Qs · Mark-scheme Qs · AI Examiner
// ═══════════════════════════════════════════════════════
import { useState, useRef } from "react";

// ─── COMPLETE CHAPTER DATABASE ────────────────────────────────────────────────
const CHAPTERS = [
  // ─── PART 1 ───────────────────────────────────────────
  {
    id: "c1",
    part: "Part 1 – Theory Fundamentals",
    level: "AS",
    title: "Information Representation",
    topics: [
      "Binary/Denary/Hex conversion",
      "Two's complement",
      "BCD",
      "ASCII & Unicode",
      "Sound sampling",
      "Image representation",
      "Run-length encoding",
    ],
    tips: [
      "Convert via binary bridge: Denary→Binary→Hex",
      "Two's comp: invert all bits then add 1",
      "File size = sample rate × bit depth × duration × channels",
      "Image size = width × height × colour depth (bits)",
      "RLE: most effective on images with repeated adjacent pixels",
    ],
    hasDiagram: true,
    diagramQuestions: [
      {
        q: "A bitmap image is 4×4 pixels. The pixel grid below uses 3-bit colour. Show the binary data stream that represents the first row: Black(000) White(111) White(111) Black(000).",
        marks: 2,
        diagramDesc: "4×4 pixel grid: Row 1 = [BLACK][WHITE][WHITE][BLACK]",
        a: "000 111 111 000\n(12 bits for first row = 4 pixels × 3 bits each)",
        explanation:
          "Each pixel uses 3 bits for colour. Row 1 has 4 pixels so 12 bits total.",
        examNote: "Show each pixel's binary separately for full marks.",
      },
      {
        q: "The following run-length encoded data represents a row of pixels: (3,W)(2,B)(4,W)(1,B). Draw the resulting pixel row and state the original and encoded sizes (in bits, using 3-bit colour + 3-bit count).",
        marks: 4,
        diagramDesc: "RLE table: (count, colour) → (3,W)(2,B)(4,W)(1,B)",
        a: "Pixel row: W W W B B W W W W B\nOriginal: 10 pixels × 3 bits = 30 bits\nEncoded: 4 pairs × (3+3) bits = 24 bits\nSaving: 6 bits",
        explanation:
          "Each RLE pair = count + colour. Multiply pairs × bits-per-pair for encoded size.",
        examNote:
          "Always calculate BOTH sizes and the saving for 4-mark RLE questions.",
      },
      {
        q: "Show the two's complement representation of -45 using 8 bits. Show all working steps.",
        marks: 3,
        diagramDesc: "Step diagram: +45 → binary → invert → add 1",
        a: "+45 = 00101101\nInvert: 11010010\nAdd 1: 11010011\n∴ -45 = 11010011",
        explanation:
          "Step 1: write positive in binary. Step 2: flip all bits. Step 3: add 1.",
        examNote: "Show each step separately. 1 mark per step typically.",
      },
      {
        q: "A colour image is 800×600 pixels with 24-bit colour depth. Calculate the uncompressed file size in megabytes. Show all working.",
        marks: 3,
        diagramDesc:
          "Formula diagram: pixels × colour depth = bits → bytes → KB → MB",
        a: "Total pixels = 800 × 600 = 480,000\nBits = 480,000 × 24 = 11,520,000 bits\nBytes = 11,520,000 ÷ 8 = 1,440,000 bytes\nMB = 1,440,000 ÷ 1,048,576 ≈ 1.37 MB",
        explanation:
          "Always divide by 1,048,576 (not 1,000,000) for megabytes in CAIE exams.",
        examNote:
          "CAIE uses 1 MB = 2²⁰ bytes = 1,048,576 bytes. Some years accept 1,000,000 — show both to be safe.",
      },
    ],
    questions: [
      {
        marks: 2,
        q: "Convert the binary number 11010110 to hexadecimal. Show your working.",
        a: "Split into nibbles: 1101 | 0110\n1101 = D\n0110 = 6\nAnswer: D6",
        explanation:
          "Group binary into sets of 4 from right. Convert each nibble separately.",
      },
      {
        marks: 2,
        q: "Convert hexadecimal 3F to denary.",
        a: "3F = 3×16 + 15×1 = 48 + 15 = 63",
        explanation:
          "Each hex digit is a power of 16: leftmost digit × 16¹, rightmost × 16⁰.",
      },
      {
        marks: 2,
        q: "State TWO advantages of using hexadecimal rather than binary when programming.",
        a: "1. Shorter/more compact representation (fewer characters)\n2. Easier for humans to read and remember\n3. Direct mapping: one hex digit = 4 binary bits",
        explanation:
          "Hex is shorthand for binary. Used in colour codes, memory addresses, opcodes.",
      },
      {
        marks: 3,
        q: "Explain the difference between ASCII and Unicode. State why Unicode was developed.",
        a: "ASCII uses 7 bits (128 characters), covers only English/basic symbols.\nUnicode uses up to 32 bits (UTF-8/16/32), covers 100,000+ characters.\nUnicode was developed because ASCII cannot represent non-Latin scripts (e.g. Arabic, Chinese, Urdu) needed for international computing.",
        explanation:
          "Key contrast: ASCII = 128 chars, Unicode = 100,000+ chars, supports all world languages.",
      },
      {
        marks: 4,
        q: "A sound file is recorded at a sample rate of 44,100 Hz with a bit depth of 16 bits in stereo for 5 minutes. Calculate the uncompressed file size in megabytes.",
        a: "Samples per second per channel = 44,100\nBit depth = 16 bits\nChannels = 2 (stereo)\nDuration = 5 × 60 = 300 seconds\nTotal bits = 44,100 × 16 × 2 × 300 = 423,360,000 bits\nBytes = 423,360,000 ÷ 8 = 52,920,000 bytes\nMB = 52,920,000 ÷ 1,048,576 ≈ 50.5 MB",
        explanation:
          "Sound file size formula: sample rate × bit depth × channels × time. Always convert time to seconds.",
      },
      {
        marks: 4,
        q: "Explain how increasing the sample rate and bit depth each affect the quality and file size of a sound recording.",
        a: "Sample rate: Higher rate captures more samples per second → better reproduction of high-frequency sounds → larger file size (proportionally). E.g. 44.1kHz vs 8kHz: far better quality.\nBit depth: More bits per sample → more possible amplitude levels → less quantisation error → smoother waveform → larger file size. E.g. 16-bit has 65,536 levels vs 8-bit's 256.",
        explanation:
          "Both improve quality AND increase size. Explain the mechanism (why) not just the direction (what).",
      },
      {
        marks: 2,
        q: "Define 'quantisation error' in the context of sound sampling.",
        a: "Quantisation error is the difference between the actual (analogue) amplitude of a sound wave and the nearest available digital value that can be stored. It causes distortion in the reproduced sound.",
        explanation:
          "More bit depth = smaller quantisation error = less distortion.",
      },
      {
        marks: 3,
        q: "Explain how run-length encoding (RLE) compresses image data. State when RLE is most effective.",
        a: "RLE stores a count and value pair instead of repeating identical values. E.g. WWWWWBBBB = (5,W)(4,B). This reduces storage when consecutive pixels share the same colour.\nMost effective: images with large areas of uniform colour (e.g. simple logos, cartoon images, screenshots with solid backgrounds).",
        explanation:
          "RLE replaces repetitions with (count, value). Best for images with long 'runs' of same colour.",
      },
    ],
  },

  {
    id: "c2",
    part: "Part 1 – Theory Fundamentals",
    level: "AS",
    title: "Communication & Networking Technologies",
    topics: [
      "OSI model (7 layers)",
      "TCP/IP model",
      "Packet switching",
      "Network topologies",
      "Wi-Fi & Ethernet",
      "DNS, HTTP, FTP, SMTP",
      "Bandwidth & latency",
    ],
    tips: [
      "OSI layers mnemonic: 'All People Seem To Need Data Processing' (Application→Physical)",
      "Packet = header + payload + trailer",
      "TCP = reliable, ordered; UDP = fast, unreliable",
      "DNS translates domain names to IP addresses",
      "Bandwidth = capacity; Latency = delay",
    ],
    hasDiagram: true,
    diagramQuestions: [
      {
        q: "Draw and label the 7 layers of the OSI model from top (layer 7) to bottom (layer 1). For each layer, state its primary function.",
        marks: 7,
        diagramDesc: "OSI stack diagram — 7 boxes stacked vertically",
        a: "7. Application – provides network services to user applications (HTTP, FTP)\n6. Presentation – data formatting, encryption, compression\n5. Session – manages sessions/connections between applications\n4. Transport – end-to-end delivery, error checking (TCP/UDP)\n3. Network – logical addressing, routing (IP)\n2. Data Link – physical addressing (MAC), error detection (frames)\n1. Physical – transmits raw bits over physical medium",
        examNote:
          "Learn one clear function per layer. Spelling of layer names must be exact.",
      },
      {
        q: "A packet sent from Computer A to Computer B passes through 3 routers. Draw a diagram showing the path and label: source IP, destination IP, and where routing decisions are made.",
        marks: 4,
        diagramDesc: "Network path: A → R1 → R2 → R3 → B",
        a: "Diagram: A → [Router 1] → [Router 2] → [Router 3] → B\nSource IP: A's IP address (in packet header, unchanged throughout)\nDestination IP: B's IP address (in packet header, unchanged throughout)\nRouting decisions made at: each Router (Layer 3, Network layer)\nMAC addresses change at each hop; IP addresses stay the same.",
        examNote:
          "IP addresses do NOT change across routers. MAC addresses change at each hop.",
      },
      {
        q: "Draw a star network topology with a central switch and 5 nodes. State TWO advantages and ONE disadvantage compared to a bus topology.",
        marks: 5,
        diagramDesc:
          "Star topology: central switch connected to 5 nodes (A,B,C,D,E)",
        a: "[Central Switch] connected to nodes A,B,C,D,E with separate cables.\nAdvantages:\n1. Failure of one cable/node does not affect others\n2. Easy to add/remove nodes without disruption\n3. Central switch can manage traffic efficiently\nDisadvantage:\n1. If central switch fails, entire network fails\n2. Requires more cable than bus topology",
        examNote:
          "For topology questions always: draw clearly, label components, give comparative advantages.",
      },
    ],
    questions: [
      {
        marks: 2,
        q: "State the difference between a circuit-switched network and a packet-switched network.",
        a: "Circuit-switched: a dedicated physical path is established for the entire duration of communication (e.g. old telephone networks). Wastes capacity when idle.\nPacket-switched: data is split into packets that travel independently via different routes and are reassembled at destination. More efficient use of bandwidth.",
        explanation:
          "Internet uses packet switching. Old telephone networks used circuit switching.",
      },
      {
        marks: 3,
        q: "Describe the role of TCP in transmitting data over a network.",
        a: "TCP (Transmission Control Protocol):\n1. Breaks data into numbered segments/packets\n2. Ensures all packets arrive (requests retransmission of lost packets)\n3. Reassembles packets in correct order at destination\n4. Performs error checking using checksums\n5. Controls flow to prevent overwhelming receiver",
        explanation:
          "TCP = reliable, ordered, connection-oriented. Used for web, email, file transfer.",
      },
      {
        marks: 4,
        q: "Explain the purpose of the Domain Name System (DNS) and describe the process when a user types 'www.bbc.co.uk' into a browser.",
        a: "DNS translates human-readable domain names into IP addresses, since computers communicate using IP addresses.\nProcess:\n1. Browser checks local DNS cache\n2. If not found, query sent to Recursive Resolver (ISP)\n3. Resolver queries Root Name Server → TLD server (.uk)\n4. TLD server directs to Authoritative Name Server for bbc.co.uk\n5. IP address returned to browser\n6. Browser connects to web server at that IP",
        explanation:
          "DNS is the 'phone book of the internet'. Caching reduces repeated lookups.",
      },
      {
        marks: 3,
        q: "Compare the roles of a router and a switch in a network.",
        a: "Switch: operates at Layer 2 (Data Link). Forwards frames within a LAN using MAC addresses. Connects devices in the same network.\nRouter: operates at Layer 3 (Network). Forwards packets between different networks using IP addresses. Connects LANs to WAN/Internet. Makes routing decisions based on routing tables.",
        explanation:
          "Switch = within network (MAC). Router = between networks (IP).",
      },
      {
        marks: 2,
        q: "Define 'bandwidth' and 'latency'. Explain the difference.",
        a: "Bandwidth: the maximum amount of data that can be transmitted per second (measured in bps, Mbps, Gbps). Represents capacity.\nLatency: the time delay between sending and receiving data (measured in milliseconds). Represents speed/delay.\nKey difference: high bandwidth does not mean low latency.",
        explanation:
          "A wide pipe (bandwidth) doesn't mean fast delivery (latency). Both matter for network performance.",
      },
      {
        marks: 4,
        q: "Describe how data is transmitted using packet switching. Include the structure of a packet in your answer.",
        a: "Data is divided into small units called packets before transmission.\nPacket structure:\n• Header: source IP, destination IP, packet number, protocol, TTL\n• Payload: the actual data segment\n• Trailer: error-checking data (checksum)\n\nEach packet may travel via different routes through the network. Routers use routing tables to forward each packet toward the destination. At the destination, TCP reassembles packets in correct order using sequence numbers. Lost packets are retransmitted.",
        explanation:
          "Know the three parts of a packet (header/payload/trailer) and what each contains.",
      },
      {
        marks: 2,
        q: "State TWO differences between HTTP and HTTPS.",
        a: "1. HTTPS encrypts data using TLS/SSL; HTTP sends data in plaintext\n2. HTTPS uses port 443; HTTP uses port 80\n3. HTTPS uses digital certificates to verify server identity\n4. HTTPS is secure against eavesdropping/man-in-the-middle attacks",
        explanation:
          "HTTPS = HTTP + TLS encryption. Always use HTTPS for sensitive data.",
      },
    ],
  },

  {
    id: "c3",
    part: "Part 1 – Theory Fundamentals",
    level: "AS",
    title: "Hardware",
    topics: [
      "CPU components (ALU, CU, registers)",
      "FDE cycle",
      "Cache memory levels",
      "Von Neumann architecture",
      "RISC vs CISC",
      "Secondary storage types",
      "I/O devices",
    ],
    tips: [
      "FDE: Fetch→Decode→Execute. PC always points to NEXT instruction",
      "MAR = address, MDR = data, CIR = current instruction, ACC = result",
      "Cache: L1 (fastest, smallest) → L2 → L3 (slowest, largest)",
      "RISC: fewer, simpler instructions; all same size; many registers",
      "HDD vs SSD: SSD faster, no moving parts, more expensive per GB",
    ],
    hasDiagram: true,
    diagramQuestions: [
      {
        q: "Draw a labelled diagram of Von Neumann architecture showing: CPU (with ALU, CU, and key registers), Main Memory, and the buses connecting them. Label each bus with its function.",
        marks: 6,
        diagramDesc:
          "Block diagram: CPU box containing ALU + CU + Registers, connected to Memory via 3 buses",
        a: "CPU contains: ALU (performs calculations), CU (controls FDE cycle), Registers (PC, MAR, MDR, CIR, ACC)\nMemory: stores instructions and data\nThree buses:\n• Address bus: carries memory addresses (CPU→Memory, unidirectional)\n• Data bus: carries data/instructions (bidirectional)\n• Control bus: carries control signals (bidirectional)\nAll components connected via system bus.",
        examNote:
          "Label ALL three buses with direction arrows. Name all registers for full marks.",
      },
      {
        q: "Draw and label a diagram showing the Fetch-Decode-Execute cycle. Show which registers are used at each stage.",
        marks: 5,
        diagramDesc:
          "Circular flow diagram: Fetch → Decode → Execute → back to Fetch",
        a: "FETCH:\n1. PC → MAR (via address bus)\n2. Memory[MAR] → MDR (via data bus)\n3. MDR → CIR\n4. PC incremented by 1\n\nDECODE:\n5. CU decodes instruction in CIR (opcode + operand)\n\nEXECUTE:\n6. CU signals appropriate component (ALU/memory/I-O)\n7. Result stored in ACC or memory\n8. Return to FETCH",
        examNote:
          "4 steps in Fetch, 1 in Decode, variable in Execute. PC increments during Fetch.",
      },
      {
        q: "Draw a diagram showing a 3-level cache hierarchy (L1, L2, L3, RAM). Label the relative speed and size of each level.",
        marks: 4,
        diagramDesc:
          "Pyramid diagram: CPU core at top, then L1→L2→L3→RAM going outward",
        a: "[CPU Core]\n↕ (fastest, smallest ~32KB)\n[L1 Cache]\n↕ (fast, small ~256KB)\n[L2 Cache]\n↕ (moderate speed, medium ~8MB)\n[L3 Cache]\n↕ (slower, large ~GB)\n[Main RAM]\n\nSpeed: L1 > L2 > L3 > RAM\nSize: L1 < L2 < L3 < RAM\nCost per bit: L1 > L2 > L3 > RAM",
        examNote:
          "Cache is SRAM; RAM is DRAM. Cache stores recently/frequently used data to reduce RAM access time.",
      },
    ],
    questions: [
      {
        marks: 2,
        q: "State the function of the Program Counter (PC) and the Memory Address Register (MAR).",
        a: "PC: holds the memory address of the NEXT instruction to be fetched. Incremented after each fetch.\nMAR: holds the address of the memory location currently being read from or written to.",
        explanation:
          "PC points NEXT, MAR points CURRENT access. They work together: PC→MAR during fetch.",
      },
      {
        marks: 3,
        q: "Explain how cache memory improves CPU performance.",
        a: "Cache is much faster to access than main RAM (L1 cache: ~1ns vs RAM: ~100ns).\nFrequently or recently used instructions/data are stored in cache.\nWhen CPU needs data, it checks cache first (cache hit) — very fast.\nOnly if data not in cache (cache miss) does it access slower RAM.\nThis reduces the average memory access time, allowing CPU to work closer to its maximum speed.",
        explanation:
          "Cache hit = fast. Cache miss = slow (must go to RAM). High hit rate = big performance gain.",
      },
      {
        marks: 4,
        q: "Compare RISC and CISC processor architectures. Give ONE advantage of each.",
        a: "RISC (Reduced Instruction Set Computer):\n• Few, simple instructions, all same length\n• Instructions execute in one clock cycle\n• Large number of general-purpose registers\n• Relies on compiler to optimise code\n• Advantage: simpler hardware design, easier pipelining, lower power\n• Used in: ARM (mobile phones)\n\nCISC (Complex Instruction Set Computer):\n• Many complex instructions of variable length\n• Single instruction can do multiple operations\n• Fewer registers\n• Hardware handles complexity\n• Advantage: more compact programs, less RAM needed\n• Used in: x86 (Intel/AMD PCs)",
        explanation:
          "RISC = simple+fast, CISC = complex+compact. ARM phones use RISC for power efficiency.",
      },
      {
        marks: 2,
        q: "State TWO factors that affect CPU performance other than clock speed.",
        a: "1. Number of processor cores (more cores = more parallel execution)\n2. Cache size and levels (larger cache = fewer cache misses)\n3. Word length (wider word = more data processed per cycle)\n4. Bus width (wider data bus = more data transferred per cycle)\n5. Pipelining (overlapping FDE stages)",
        explanation:
          "Never say 'faster clock speed' when asked for OTHER factors. Always give distinct factors.",
      },
      {
        marks: 3,
        q: "Compare HDDs and SSDs as secondary storage. Consider speed, reliability, and cost.",
        a: "Speed: SSD significantly faster (read/write ~500MB/s+) vs HDD (~100MB/s). SSD has near-instant access; HDD has rotational latency.\nReliability: SSD more reliable — no moving parts, less susceptible to physical shock. HDD has spinning platters and read/write heads that can fail mechanically.\nCost: HDD cheaper per GB (e.g. £0.02/GB vs £0.10/GB for SSD). HDD better for large, cheap storage.\nConclusion: SSDs preferred for performance-critical use; HDDs for bulk/archive storage.",
        explanation:
          "Exam loves speed, reliability, cost comparisons. Give actual mechanisms, not just 'better'.",
      },
      {
        marks: 4,
        q: "Describe the role of interrupts in a CPU. Include in your answer what happens when an interrupt is detected during the FDE cycle.",
        a: "An interrupt is a signal sent to the CPU requesting immediate attention from hardware or software.\nTypes: hardware interrupts (e.g. keyboard press), software interrupts (e.g. divide by zero), timer interrupts.\n\nWhen detected (checked after Execute stage):\n1. CPU checks interrupt priority\n2. If higher priority than current task, current register values saved to stack (context saved)\n3. PC set to Interrupt Service Routine (ISR) address\n4. ISR executes to handle the interrupt\n5. After ISR completes, saved context restored from stack\n6. CPU resumes original program from where it left off",
        explanation:
          "Interrupts allow the CPU to respond to events. Context save/restore is essential for correct resumption.",
      },
    ],
  },

  {
    id: "c4",
    part: "Part 1 – Theory Fundamentals",
    level: "AS",
    title: "Logic Gates & Logic Circuits",
    topics: [
      "AND, OR, NOT, NAND, NOR, XOR gates",
      "Truth tables",
      "Boolean algebra laws",
      "De Morgan's theorem",
      "Karnaugh maps (2 and 3 variable)",
      "Half adder and full adder",
      "SR latch",
    ],
    tips: [
      "NAND and NOR are universal gates — can build any circuit",
      "De Morgan's: NOT(A AND B) = NOT A OR NOT B",
      "K-map groups must be powers of 2 (1,2,4,8)",
      "Half adder: Sum = A XOR B, Carry = A AND B",
      "Full adder adds Carry-in; builds multi-bit adders",
      "SR latch: S=R=1 is INVALID (indeterminate)",
    ],
    hasDiagram: true,
    diagramQuestions: [
      {
        q: "Draw the logic circuit for the Boolean expression: F = (A AND B) OR (NOT A AND C). Label all gates and inputs.",
        marks: 4,
        diagramDesc: "Logic circuit with AND, OR, NOT gates for F = AB + A'C",
        a: "Circuit:\n• Gate 1 (AND): inputs A, B → output AB\n• Gate 2 (NOT): input A → output A'\n• Gate 3 (AND): inputs A', C → output A'C\n• Gate 4 (OR): inputs AB, A'C → output F\n\nF = AB + A'C",
        examNote:
          "Draw gates in correct order. Label each gate type and all signal lines.",
      },
      {
        q: "Complete the truth table for a full adder with inputs A, B, and Cin. Show outputs Sum and Cout.",
        marks: 4,
        diagramDesc: "Full adder truth table: 8 rows (A,B,Cin → Sum,Cout)",
        a: "A B Cin | Sum Cout\n0 0  0  |  0    0\n0 0  1  |  1    0\n0 1  0  |  1    0\n0 1  1  |  0    1\n1 0  0  |  1    0\n1 0  1  |  0    1\n1 1  0  |  0    1\n1 1  1  |  1    1\n\nSum = A XOR B XOR Cin\nCout = (A AND B) OR (Cin AND (A XOR B))",
        examNote:
          "8 rows for 3 inputs. Sum = majority odd number of 1s. Carry = 2 or 3 inputs are 1.",
      },
      {
        q: "Draw a Karnaugh map for F(A,B,C) = Σ(1,3,5,7). Identify the groups and write the simplified Boolean expression.",
        marks: 5,
        diagramDesc: "3-variable K-map with minterms 1,3,5,7",
        a: "K-map layout (BC axis top, A axis side):\n     BC=00  BC=01  BC=11  BC=10\nA=0:   0      1      1      0\nA=1:   0      1      1      0\n\nGroup of 4: all cells in BC=01 and BC=11 columns (minterms 1,3,5,7)\nThis covers: C=1 (regardless of A or B)\nSimplified: F = C",
        examNote:
          "Group largest possible groups of 2^n. Wrap around edges. Read off variables that DON'T change.",
      },
      {
        q: "Draw the circuit for an SR latch using two NAND gates. Complete its truth table and state what condition makes the output indeterminate.",
        marks: 5,
        diagramDesc: "SR NAND latch: two NAND gates cross-coupled",
        a: "Circuit: Two NAND gates.\n• NAND1: inputs S and Q' → output Q\n• NAND2: inputs R and Q → output Q'\n(Cross-coupled: Q' feeds back to NAND1, Q feeds back to NAND2)\n\nTruth table (active-low inputs for NAND latch):\nS' R' | Q  Q'\n0  0  | 1  1  ← FORBIDDEN (indeterminate)\n0  1  | 1  0  (Set)\n1  0  | 0  1  (Reset)\n1  1  | Retain previous state (memory)\n\nIndeterminate: S=R=0 (both inputs active at same time)",
        examNote:
          "NAND latch uses active-LOW inputs (0=active). SR latch with NOR uses active-HIGH (1=active).",
      },
    ],
    questions: [
      {
        marks: 2,
        q: "Prove using Boolean algebra that A + AB = A.",
        a: "A + AB = A(1 + B)  [factoring A]\n= A × 1           [since 1+B = 1]\n= A               [identity law]\nThis is the Absorption Law.",
        explanation:
          "Absorption law: A + AB = A. Learn all basic laws: identity, null, complement, idempotent, absorption.",
      },
      {
        marks: 3,
        q: "Use De Morgan's theorem to simplify NOT(A OR B) AND NOT(A AND C).",
        a: "Apply De Morgan's:\nNOT(A OR B) = NOT A AND NOT B\nNOT(A AND C) = NOT A OR NOT C\n\nExpression = (NOT A AND NOT B) AND (NOT A OR NOT C)\n= NOT A AND (NOT B AND (NOT A OR NOT C))\n= NOT A AND ((NOT B AND NOT A) OR (NOT B AND NOT C))\n= NOT A AND NOT B AND NOT C   [since NOT A absorbs]\nor simplified: A'B'C' is one valid simplification.",
        explanation:
          "De Morgan's: NOT(X AND Y) = NOT X OR NOT Y; NOT(X OR Y) = NOT X AND NOT Y.",
      },
      {
        marks: 3,
        q: "Show using a truth table that NAND is a universal gate by constructing NOT and AND using only NAND gates.",
        a: "NOT A using NAND:\n• Connect both inputs of NAND to A\n• NAND(A,A) = NOT(A AND A) = NOT A ✓\n\nAND(A,B) using NAND:\n• Gate1: NAND(A,B) = NOT(A.B)\n• Gate2: NOT[NOT(A.B)] = A.B ✓ (using NAND as NOT)\n\nTruth table for NOT:\nA | NAND(A,A)\n0 |     1\n1 |     0  ✓",
        explanation:
          "Universal gate = can make any other gate. NAND and NOR are both universal.",
      },
      {
        marks: 4,
        q: "Simplify the Boolean expression F = ABC + ABC' + AB'C + A'BC using Boolean algebra. Show each step.",
        a: "F = ABC + ABC' + AB'C + A'BC\n= AB(C + C') + AC(B + B') ... wait, regroup:\n= AB(C + C') + A'BC\n  [ABC + ABC' = AB since C+C'=1]\n= AB + A'BC\n  [AB + A'BC]\n= AB + A'BC (cannot simplify further without K-map)\n\nOr via K-map gives: F = AB + BC (using K-map method)\nVerify: when A=1,B=1: AB=1 ✓; when B=1,C=1,A=0: BC=1 ✓",
        explanation:
          "For complex simplification, K-map is faster. Show groupings clearly.",
      },
      {
        marks: 2,
        q: "State the Boolean expressions for the Sum and Carry outputs of a half adder.",
        a: "Sum = A XOR B  (A ⊕ B)\nCarry = A AND B  (A · B)\n\nA half adder adds two 1-bit numbers, producing a 2-bit result (Sum, Carry).",
        explanation:
          "Half adder handles 2 inputs. Full adder handles 3 inputs (adds Carry-in).",
      },
    ],
  },

  {
    id: "c5",
    part: "Part 1 – Theory Fundamentals",
    level: "AS",
    title: "Processor Fundamentals",
    topics: [
      "Registers: PC, MAR, MDR, CIR, ACC, IX",
      "Addressing modes: immediate, direct, indirect, indexed",
      "Instruction format: opcode + operand",
      "Interrupts and ISR",
      "Pipelining",
      "Factors affecting performance",
    ],
    tips: [
      "Immediate: #value (the value itself)",
      "Direct: the operand IS the address",
      "Indirect: the operand holds an ADDRESS of the address",
      "Indexed: operand + IX register = effective address",
      "Pipelining overlaps FDE stages — increases throughput NOT latency",
    ],
    hasDiagram: false,
    questions: [
      {
        marks: 2,
        q: "Explain the difference between immediate addressing mode and direct addressing mode.",
        a: "Immediate addressing: the operand in the instruction IS the actual data value to be used (e.g. LDD #42 loads the value 42 into the accumulator).\nDirect addressing: the operand is the memory address where the data is stored (e.g. LDD 200 loads the value found at memory address 200).",
        explanation:
          "Immediate = the value itself (#). Direct = address of the value. Common exam question.",
      },
      {
        marks: 3,
        q: "Describe how indexed addressing works. Include an example using the Index Register (IX).",
        a: "Indexed addressing: the effective (actual) memory address is calculated by adding the value in the Index Register (IX) to the operand in the instruction.\nEffective address = operand + IX\n\nExample: LDD 100, IX\nIf IX = 5, effective address = 100 + 5 = 105\nThe CPU loads the value from memory address 105 into the accumulator.\n\nUse: useful for iterating through arrays (increment IX each loop iteration).",
        explanation:
          "Indexed addressing enables array traversal by incrementing IX. Very common in assembly loops.",
      },
      {
        marks: 3,
        q: "Explain what is meant by pipelining. State how it improves CPU performance and ONE problem it can cause.",
        a: "Pipelining allows different stages of the FDE cycle (Fetch, Decode, Execute) to overlap — while one instruction is being executed, the next is being decoded, and the one after is being fetched.\nThis increases instruction throughput (more instructions completed per unit time).\n\nProblem: Pipeline hazards — a branch/jump instruction may cause the wrong instructions to be fetched (branch hazard), requiring the pipeline to be flushed, wasting cycles.",
        explanation:
          "Pipelining ≠ faster individual instructions. It increases throughput. Data hazards also occur.",
      },
      {
        marks: 4,
        q: "A CPU has a clock speed of 3.2 GHz and executes on average 2 instructions per clock cycle (IPC = 2). Calculate how many instructions it executes per second. Explain how a second CPU core affects this.",
        a: "Instructions per second = clock speed × IPC\n= 3,200,000,000 × 2\n= 6,400,000,000 = 6.4 × 10⁹ instructions/second\n\nSecond core: With 2 cores each with the same specification, maximum throughput = 2 × 6.4 × 10⁹ = 1.28 × 10¹⁰ instructions/second, BUT only if the workload can be parallelised. Sequential tasks see no benefit from extra cores.",
        explanation:
          "IPC × clock speed = throughput. Multi-core helps only for parallelisable workloads.",
      },
      {
        marks: 2,
        q: "State the purpose of the Current Instruction Register (CIR) and the Accumulator (ACC).",
        a: "CIR: holds the instruction currently being decoded and executed. Receives the instruction from the MDR during the fetch stage.\nACC: holds the result of arithmetic and logic operations performed by the ALU. Also temporarily holds data being processed.",
        explanation:
          "CIR = current instruction being processed. ACC = temporary result store.",
      },
      {
        marks: 4,
        q: "Describe what happens, step by step, when an interrupt occurs during the execute stage of the FDE cycle.",
        a: "1. CPU checks interrupt flag after Execute stage (end of each FDE cycle)\n2. If interrupt flagged and priority > current task:\n3. Current register values (PC, ACC, etc.) are PUSHED onto the stack (context save)\n4. PC is loaded with the address of the Interrupt Service Routine (ISR)\n5. ISR executes to handle the interrupt (e.g. process keypress)\n6. When ISR completes, register values POPPED from stack (context restore)\n7. CPU resumes execution of original program from saved PC address\n8. Interrupt flag cleared",
        explanation:
          "Key words: context save, ISR, stack, restore. Must include all 8 steps for full marks on a 4-mark question.",
      },
    ],
  },

  {
    id: "c6",
    part: "Part 1 – Theory Fundamentals",
    level: "AS",
    title: "Assembly Language Programming",
    topics: [
      "Assembly instruction format",
      "LDD, STO, ADD, SUB, INC, DEC",
      "Branching: JMP, JPE, JPN, JPS",
      "Comparison: CMP",
      "I/O: IN, OUT",
      "Writing loops and conditionals in assembly",
      "Trace tables",
    ],
    tips: [
      "LDD = Load into ACC; STO = Store from ACC to memory",
      "CMP compares ACC with value — sets flags",
      "JPE = Jump if equal; JPN = jump if NOT; JPS = jump if positive",
      "Always trace with a table: PC | Instruction | ACC | Other registers",
      "IN reads from keyboard to ACC; OUT writes ACC to display",
    ],
    hasDiagram: false,
    questions: [
      {
        marks: 4,
        q: "Trace the following assembly program. Show the value of the accumulator and memory location X after each instruction.\nLDD #5\nSTO X\nLDD #3\nADD X\nSTO X\nHALT",
        a: "PC | Instruction | ACC | X\n1  | LDD #5       |  5  | -\n2  | STO X        |  5  | 5\n3  | LDD #3       |  3  | 5\n4  | ADD X        |  8  | 5  (3+5=8)\n5  | STO X        |  8  | 8\n6  | HALT         |  8  | 8\n\nFinal result: X = 8, ACC = 8",
        explanation:
          "Trace table must show each instruction's effect. Show intermediate state after EACH line.",
      },
      {
        marks: 5,
        q: "Write an assembly language program that reads two numbers from input, adds them together, and outputs the result.",
        a: "IN          ; Read first number into ACC\nSTO num1    ; Store in memory as num1\nIN          ; Read second number into ACC\nADD num1    ; Add first number to ACC\nOUT         ; Output result\nHALT        ; Stop execution\n\n; Data section\nnum1: 0     ; memory location for first number",
        explanation:
          "IN loads from keyboard to ACC. STO saves ACC to memory. ADD adds memory to ACC. OUT displays ACC.",
      },
      {
        marks: 6,
        q: "Write an assembly language program to count from 1 to 10, outputting each number. Use a loop with a counter.",
        a: "; Initialise counter\nLDD #1      ; ACC = 1 (starting value)\nSTO count   ; Store counter\n\nLOOP:\nLDD count   ; Load current count\nOUT         ; Output current count\nCMP #10     ; Compare ACC with 10\nJPE DONE    ; Jump to DONE if equal to 10\nINC count   ; Increment counter\nJMP LOOP    ; Jump back to LOOP\n\nDONE:\nHALT\n\ncount: 0    ; memory for counter",
        explanation:
          "Loop structure: initialise → output → check → increment → repeat. CMP sets flags for conditional jump.",
      },
      {
        marks: 3,
        q: "Explain the difference between JPE, JPN, and JMP instructions.",
        a: "JMP (Jump): unconditional branch — always jumps to specified address/label regardless of any conditions.\nJPE (Jump if Equal): conditional — jumps only if the Zero flag is set (i.e. previous CMP found values equal).\nJPN (Jump if Not equal): conditional — jumps if Zero flag is NOT set (values were not equal).\nJPS (Jump if Positive): conditional — jumps if result was positive (sign flag = positive).",
        explanation:
          "Conditional jumps depend on flags set by previous CMP or arithmetic. JMP is always taken.",
      },
      {
        marks: 4,
        q: "Write assembly code to find the larger of two numbers stored in memory locations A and B, and store the result in memory location MAX.",
        a: "LDD A       ; Load first number\nCMP B       ; Compare ACC (A) with B\nJPS A_larger; If A > B, jump (positive means A-B > 0)\nLDD B       ; Else load B (B is larger)\nSTO MAX     ; Store B in MAX\nJMP DONE    ; Skip A_larger block\n\nA_larger:\nLDD A       ; Load A\nSTO MAX     ; Store A in MAX\n\nDONE:\nHALT",
        explanation:
          "Use CMP then JPS to branch. If A-B is positive, A is larger. Must handle both cases.",
      },
    ],
  },

  {
    id: "c7",
    part: "Part 1 – Theory Fundamentals",
    level: "AS",
    title: "Monitoring & Control Systems",
    topics: [
      "Sensors and actuators",
      "Analogue to Digital Converter (ADC)",
      "Real-time systems",
      "Open-loop vs closed-loop control",
      "Interrupt-driven vs polling",
      "Embedded systems",
    ],
    tips: [
      "ADC converts continuous analogue signals to discrete digital values",
      "Closed-loop = uses feedback; open-loop = no feedback",
      "Polling constantly checks sensors; interrupts are more efficient",
      "Real-time systems MUST respond within a guaranteed time",
      "Embedded systems are dedicated to one task",
    ],
    hasDiagram: true,
    diagramQuestions: [
      {
        q: "Draw a diagram of a closed-loop control system for a central heating thermostat. Label: sensor, ADC, microprocessor, actuator, and feedback path.",
        marks: 5,
        diagramDesc:
          "Closed-loop block diagram: Sensor → ADC → Microprocessor → Actuator → Environment → back to Sensor",
        a: "[Temperature Sensor] → [ADC] → [Microprocessor/Controller]\n                                            ↓\n                                       [Actuator: Boiler/Valve]\n                                            ↓\n                                    [Environment: Room]\n                                            ↓ (temperature changes)\n                              [Feedback back to Temperature Sensor]\n\nThe microprocessor compares measured temperature with desired temperature. If too cold, actuator turns on boiler. Temperature rise is fed back via sensor — this IS closed-loop control.",
        examNote:
          "Feedback path must close the loop. Label the comparison/decision point in the microprocessor.",
      },
    ],
    questions: [
      {
        marks: 2,
        q: "Explain why an Analogue to Digital Converter (ADC) is needed in a monitoring system.",
        a: "Sensors produce continuous analogue signals (e.g. varying voltage representing temperature). Microprocessors/computers can only process digital (binary) data. The ADC samples the analogue signal at regular intervals and converts each sample to a binary value that the computer can process.",
        explanation:
          "Analogue = continuous. Digital = discrete binary. ADC bridges the gap.",
      },
      {
        marks: 3,
        q: "Compare interrupt-driven input with polling for a monitoring system. Give ONE advantage of each.",
        a: "Polling: processor continuously checks each sensor in a loop to see if input has changed. Simple to program.\nAdvantage: predictable timing, simple implementation.\n\nInterrupt-driven: sensor signals the CPU only when input changes. CPU handles other tasks in between.\nAdvantage: more efficient — CPU not wasting cycles checking sensors with no change; better response to critical events.",
        explanation:
          "Polling wastes CPU time. Interrupts are efficient but more complex to program.",
      },
      {
        marks: 3,
        q: "Describe a real-time system. Give TWO examples and explain why real-time processing is essential in each.",
        a: "Real-time system: a system that must respond to inputs and produce outputs within a guaranteed, specified time period. The response time is critical — late response is as bad as no response.\n\nExample 1: Anti-lock braking system (ABS) — must detect wheel lock and release brake within milliseconds. Delay could cause accident.\nExample 2: Pacemaker — must detect irregular heartbeat and send pulse within precise time window. Any delay could be fatal.",
        explanation:
          "Real-time = guaranteed response time. Medical, safety-critical, and industrial control systems.",
      },
      {
        marks: 4,
        q: "A greenhouse monitoring system uses temperature and humidity sensors. Describe how the system would work, including how the microprocessor would respond to detected values outside acceptable ranges.",
        a: "1. Temperature sensor continuously measures greenhouse temperature; humidity sensor measures humidity.\n2. ADCs convert analogue sensor outputs to digital values.\n3. Microprocessor reads digital values and compares to pre-programmed acceptable ranges.\n4. If temperature too high: actuator opens vents/activates cooling fan.\n5. If temperature too low: actuator activates heating element.\n6. If humidity too low: actuator activates irrigation/misting system.\n7. System continuously monitors (closed-loop) — adjustments fed back until values return to range.\n8. Data logged with timestamps for analysis.",
        explanation:
          "Full marks require: sensors → ADC → comparison → actuator response → feedback. Describe each.",
      },
    ],
  },

  {
    id: "c8",
    part: "Part 1 – Theory Fundamentals",
    level: "AS",
    title: "System Software",
    topics: [
      "Operating system functions",
      "Memory management",
      "Process scheduling algorithms",
      "Device drivers",
      "Virtual memory and paging",
      "Utility software",
      "Types of OS (real-time, batch, multi-user, embedded)",
    ],
    tips: [
      "OS manages 5 things: CPU, memory, I/O, files, users",
      "Virtual memory uses disk as extension of RAM — causes thrashing if overused",
      "Round Robin = equal time slices; SJF = shortest first; FCFS = first come first served",
      "Device driver = translator between OS and hardware device",
      "Utility: defragmenter, disk checker, backup, compression",
    ],
    hasDiagram: true,
    diagramQuestions: [
      {
        q: "Draw a diagram showing how virtual memory works using paging. Show: RAM, hard disk (swap space), page table, and the process of a page fault.",
        marks: 5,
        diagramDesc:
          "Virtual memory diagram: Process → Page Table → RAM or Disk",
        a: "[Process needs page X]\n    ↓\n[Page Table lookup]\n    ↓ page in RAM?  ↓ not in RAM (PAGE FAULT)\n[Access RAM]    [OS loads page from disk to RAM]\n                [If RAM full: swap out least used page to disk]\n                [Update page table]\n                [Resume process]\n\nPage table: maps virtual addresses to physical addresses\nRAM: holds currently active pages (frames)\nDisk (swap): holds inactive pages",
        examNote:
          "Must show page fault process and page table. Virtual address ≠ physical address.",
      },
    ],
    questions: [
      {
        marks: 4,
        q: "Describe FOUR functions of an operating system.",
        a: "1. Processor management: schedules processes, allocates CPU time using scheduling algorithms.\n2. Memory management: allocates/deallocates RAM to processes, manages virtual memory.\n3. Device management: provides device drivers, manages I/O operations, handles interrupts.\n4. File management: organises files in directory structure, controls read/write access, manages file permissions.\n5. User interface: provides CLI or GUI for user to interact with system.",
        explanation:
          "4 functions for 4 marks. Give the name AND what it does for each.",
      },
      {
        marks: 3,
        q: "Explain the Round Robin scheduling algorithm. State its advantage over First Come First Served (FCFS).",
        a: "Round Robin: each process is given a fixed time slice (quantum). If a process doesn't complete in its time slice, it's moved to the back of the ready queue and the next process runs. Continues until all processes complete.\n\nAdvantage over FCFS: no process can monopolise the CPU — all processes get regular CPU time (fair). FCFS can leave short processes waiting a long time behind a long process (convoy effect).",
        explanation:
          "Round Robin prevents starvation. Time quantum choice matters: too small = too much overhead; too large = like FCFS.",
      },
      {
        marks: 3,
        q: "Explain what is meant by virtual memory. State ONE benefit and ONE drawback.",
        a: "Virtual memory: a memory management technique that uses secondary storage (hard disk) as an extension of RAM. When RAM is full, inactive pages of memory are swapped out to disk, freeing RAM for active processes. Programs can use more memory than physically available RAM.\n\nBenefit: allows larger programs to run than physical RAM allows; supports more simultaneous processes.\nDrawback: much slower than RAM (disk access time >> RAM access time); excessive swapping causes thrashing, severely degrading performance.",
        explanation:
          "Virtual memory = RAM + disk. Benefit: more capacity. Cost: speed. Thrashing = constant page swapping.",
      },
      {
        marks: 2,
        q: "Explain the purpose of a device driver.",
        a: "A device driver is software that acts as a translator between the operating system and a specific hardware device. It allows the OS to communicate with hardware using standardised commands, without needing to know the hardware's specific implementation details. Each hardware device requires its own driver.",
        explanation:
          "Driver = translator OS↔hardware. Without it, OS can't control the device.",
      },
    ],
  },

  {
    id: "c9",
    part: "Part 1 – Theory Fundamentals",
    level: "AS",
    title: "Security, Privacy & Data Integrity",
    topics: [
      "Symmetric vs asymmetric encryption",
      "Public and private keys",
      "Hashing",
      "Digital signatures and certificates",
      "Firewalls",
      "Types of malware",
      "Access control and authentication",
    ],
    tips: [
      "Symmetric: same key for encrypt/decrypt (fast but key sharing problem)",
      "Asymmetric: public key encrypts, private key decrypts",
      "Hash is one-way and fixed length — used for passwords",
      "Digital signature: encrypted with SENDER's private key, verified with public key",
      "Firewall filters traffic based on rules; proxy firewall also caches",
    ],
    hasDiagram: true,
    diagramQuestions: [
      {
        q: "Draw a diagram showing how asymmetric encryption is used to send a secure message from Alice to Bob. Label all keys used and show the direction of encryption and decryption.",
        marks: 5,
        diagramDesc:
          "Asymmetric encryption flow: Alice → encrypted message → Bob",
        a: "Alice has: Bob's Public Key, Alice's Private Key\nBob has: Bob's Private Key, Alice's Public Key\n\nFlow:\n[Alice's plaintext]\n    ↓ [Encrypted with BOB's PUBLIC KEY]\n[Ciphertext sent over network]\n    ↓ [Decrypted with BOB's PRIVATE KEY]\n[Bob reads plaintext]\n\nOnly Bob's private key can decrypt what Bob's public key encrypted.\nKey rule: Encrypt with RECIPIENT's public key; Decrypt with RECIPIENT's private key.",
        examNote:
          "Never: encrypt with own public key. Always: use RECIPIENT's public key.",
      },
      {
        q: "Draw a diagram showing how a digital signature is created and verified. Show both the signing process (sender's side) and verification process (receiver's side).",
        marks: 6,
        diagramDesc:
          "Digital signature: hash → sign with private key → verify with public key",
        a: "SIGNING (Alice):\n[Original message]\n    ↓ [Hash function]\n[Message digest/hash]\n    ↓ [Encrypt with ALICE's PRIVATE KEY]\n[Digital signature]\nSend: [Original message + Digital signature]\n\nVERIFICATION (Bob):\n[Received message] → [Hash function] → [Hash 1]\n[Digital signature] → [Decrypt with ALICE's PUBLIC KEY] → [Hash 2]\nCompare Hash 1 and Hash 2:\n• Equal: message is authentic and unmodified ✓\n• Different: message tampered or signature invalid ✗",
        examNote:
          "Signature proves: 1) message from Alice (authentication) 2) message not changed (integrity).",
      },
    ],
    questions: [
      {
        marks: 3,
        q: "Explain the difference between symmetric and asymmetric encryption. State ONE advantage of each.",
        a: "Symmetric: uses the same key for both encryption and decryption. Both parties must have the same secret key.\nAdvantage: fast, computationally efficient — good for encrypting large amounts of data.\n\nAsymmetric: uses a key pair — public key (shared openly) and private key (kept secret). Public key encrypts; private key decrypts.\nAdvantage: solves key distribution problem — public key can be shared openly without security risk.",
        explanation:
          "Symmetric = fast, key sharing problem. Asymmetric = slower, secure key exchange. HTTPS uses both.",
      },
      {
        marks: 3,
        q: "Explain what hashing is and why it is used to store passwords.",
        a: "Hashing is a one-way process that converts data of any length into a fixed-length string (hash/digest) using a mathematical algorithm.\nProperties: same input always gives same hash; even small input change gives completely different hash; cannot reverse hash to get original data.\n\nUsed for passwords: only the hash is stored in the database. When user logs in, their entered password is hashed and compared to stored hash. If attacker steals database, they get hashes (useless) not actual passwords.",
        explanation:
          "Hashing is one-way (not encryption). Passwords should use salted hashing (add random data before hashing).",
      },
      {
        marks: 2,
        q: "State TWO types of malware and describe what each does.",
        a: "1. Virus: attaches itself to legitimate programs; spreads when programs are shared/executed; can delete files, corrupt data, or spread further.\n2. Ransomware: encrypts the victim's files, making them inaccessible; demands payment (ransom) for the decryption key.\n3. Spyware: secretly monitors user activity (keystrokes, browsing) and sends data to attacker.\n4. Trojan: disguises itself as legitimate software; when run, performs malicious actions in background.",
        explanation:
          "1 mark per type: name + what it does. State both clearly.",
      },
      {
        marks: 4,
        q: "Describe how a firewall protects a network. Distinguish between a packet-filtering firewall and an application-level firewall (proxy firewall).",
        a: "A firewall monitors and controls incoming/outgoing network traffic based on predetermined security rules, acting as a barrier between trusted internal network and untrusted external network.\n\nPacket-filtering firewall: examines packet headers (source/destination IP, port, protocol). Accepts or rejects based on rules. Fast but cannot inspect packet content. Cannot detect malware hidden in allowed traffic.\n\nApplication-level (proxy) firewall: operates at application layer. Fully inspects packet content, not just headers. Acts as intermediary — requests made on behalf of client. Can detect and block application-level attacks (e.g. malicious web content). Slower but more thorough.",
        explanation:
          "Packet filter = headers only (fast). Application proxy = full content inspection (slow but thorough).",
      },
    ],
  },

  {
    id: "c10",
    part: "Part 1 – Theory Fundamentals",
    level: "AS",
    title: "Ethics & Ownership",
    topics: [
      "Copyright law",
      "Creative Commons licences",
      "Open source vs proprietary software",
      "Data Protection Act / GDPR",
      "Computer Misuse Act",
      "Environmental impact of computing",
      "Digital divide",
      "Professional codes of conduct",
    ],
    tips: [
      "GDPR 8 rights: access, rectification, erasure, portability, restriction, objection, automated decision-making, data breach notification",
      "Computer Misuse Act 1990 (UK): 3 offences — unauthorised access, unauthorised access with intent, unauthorised modification",
      "Open source: source code available, free to modify. Proprietary: closed source, licence required",
      "Creative Commons allows sharing with conditions (attribution, no commercial use, share-alike, etc.)",
    ],
    hasDiagram: false,
    questions: [
      {
        marks: 3,
        q: "State THREE rights given to individuals under the GDPR (General Data Protection Regulation).",
        a: "1. Right of access: individuals can request a copy of their personal data held by an organisation.\n2. Right to erasure ('right to be forgotten'): individuals can request deletion of their personal data.\n3. Right to data portability: individuals can receive their data in a machine-readable format to transfer to another service.\n4. Right to rectification: individuals can request correction of inaccurate data.\n5. Right to restrict processing: individuals can limit how their data is used.",
        explanation:
          "GDPR has 8 rights. Know at least 5. State name + brief explanation for each mark.",
      },
      {
        marks: 3,
        q: "Describe the THREE offences under the Computer Misuse Act 1990.",
        a: "1. Unauthorised access to computer material: accessing any computer system or data without permission (e.g. guessing someone's password). Up to 12 months imprisonment.\n2. Unauthorised access with intent to commit a further offence: accessing a system intending to commit a more serious crime (e.g. accessing a bank system to commit fraud). Up to 5 years.\n3. Unauthorised modification of computer material: deliberately altering, deleting, or corrupting data or programs without permission (e.g. releasing malware). Up to 10 years.",
        explanation:
          "Know all 3 offences AND their penalties. 1 mark per offence with correct description.",
      },
      {
        marks: 2,
        q: "Distinguish between open source software and proprietary software.",
        a: "Open source: the source code is made publicly available. Anyone can view, modify, and distribute the software. Usually free. Examples: Linux, Python, Firefox.\n\nProprietary: source code is kept secret by the company. Users pay for a licence to use it but cannot modify it. Examples: Microsoft Windows, Adobe Photoshop.",
        explanation:
          "Open source ≠ necessarily free (as in money). The key difference is source code availability.",
      },
      {
        marks: 4,
        q: "Discuss the ethical issues surrounding the digital divide. Include social, economic, and educational impacts.",
        a: "Digital divide: the gap between those who have access to digital technology (internet, computers) and those who do not.\n\nSocial impact: socially isolated communities miss online social services, government services, healthcare information. Increases inequality.\n\nEconomic impact: jobs increasingly require digital skills. Those without access/skills locked out of better-paying employment. Developing nations fall further behind in global economy.\n\nEducational impact: online learning resources, digital textbooks, research tools inaccessible. Students without home internet at significant disadvantage (highlighted during COVID-19 pandemic).\n\nMoral argument: access to information technology is increasingly considered a human right. Bridging the gap requires government investment, infrastructure development, and digital literacy programs.",
        explanation:
          "4 marks = 4 distinct points with development. Always relate back to real people/consequences.",
      },
      {
        marks: 2,
        q: "State TWO reasons why software companies release software under a Creative Commons licence rather than full copyright.",
        a: "1. To allow others to build upon and improve the software while retaining some control over usage (e.g. requiring attribution or restricting commercial use).\n2. To increase adoption and sharing of knowledge while protecting the creator's moral rights.\n3. To allow non-profit/educational use while preventing commercial exploitation.",
        explanation:
          "Creative Commons is a middle ground between full copyright and public domain. Many types of CC licence.",
      },
    ],
  },

  {
    id: "c11",
    part: "Part 1 – Theory Fundamentals",
    level: "AS",
    title: "Databases",
    topics: [
      "Relational database concepts",
      "Primary and foreign keys",
      "Entity-relationship (ER) diagrams",
      "SQL: SELECT, INSERT, UPDATE, DELETE",
      "Normalisation: 1NF, 2NF, 3NF",
      "ACID properties",
      "Referential integrity",
    ],
    tips: [
      "SELECT col FROM table WHERE condition ORDER BY col ASC/DESC",
      "JOIN: INNER JOIN tableName ON table1.col = table2.col",
      "1NF: atomic values, no repeating groups",
      "2NF: 1NF + no partial dependencies (all non-key attributes depend on WHOLE primary key)",
      "3NF: 2NF + no transitive dependencies",
      "ACID: Atomicity, Consistency, Isolation, Durability",
    ],
    hasDiagram: true,
    diagramQuestions: [
      {
        q: "Draw an Entity-Relationship (ER) diagram for a school database with the following entities: Student, Course, Teacher. A student can enrol in many courses; a course is taught by one teacher; a teacher can teach many courses. Label cardinality.",
        marks: 5,
        diagramDesc: "ER diagram with 3 entities and relationships",
        a: "[STUDENT] ----<< ENROLLS IN >>---- [COURSE] ---->> TAUGHT BY ----[TEACHER]\n\nCardinalities:\n• Student to Course: MANY-TO-MANY (M:N)\n  (Requires junction table: ENROLMENT with StudentID + CourseID)\n• Course to Teacher: MANY-TO-ONE (N:1)\n  (Many courses can be taught by one teacher)\n\nER Diagram:\nSTUDENT [StudentID(PK), Name, DOB]\n   ↕ M:N\nENROLMENT [StudentID(FK), CourseID(FK), EnrolDate]\n   ↕ N:1\nCOURSE [CourseID(PK), CourseName, TeacherID(FK)]\n   ↕ N:1\nTEACHER [TeacherID(PK), TeacherName]",
        examNote:
          "M:N relationships need a junction/link table with both FKs as composite primary key.",
      },
    ],
    questions: [
      {
        marks: 3,
        q: "Write an SQL query to retrieve the names and grades of all students who scored more than 70 in 'Computer Science', sorted by grade descending. Use tables: Student(StudentID, Name) and Result(StudentID, Subject, Grade).",
        a: "SELECT Student.Name, Result.Grade\nFROM Student\nINNER JOIN Result ON Student.StudentID = Result.StudentID\nWHERE Result.Subject = 'Computer Science'\n  AND Result.Grade > 70\nORDER BY Result.Grade DESC;",
        explanation:
          "SELECT specifies columns. FROM + JOIN links tables. WHERE filters. ORDER BY sorts.",
      },
      {
        marks: 3,
        q: "Explain the three normal forms (1NF, 2NF, 3NF) with a brief example for each.",
        a: "1NF: All attributes must contain atomic (indivisible) values; no repeating groups.\nExample violation: storing 'Math, English, Science' in one cell. Fix: separate rows per subject.\n\n2NF: Must be in 1NF + no partial dependencies. In a composite PK, non-key attributes must depend on the WHOLE key, not just part of it.\nExample: In table (StudentID, CourseID, StudentName) — StudentName depends only on StudentID (partial dependency). Fix: separate Student table.\n\n3NF: Must be in 2NF + no transitive dependencies. Non-key attributes must not depend on other non-key attributes.\nExample: (StudentID, TeacherID, TeacherName) — TeacherName depends on TeacherID (not directly on StudentID). Fix: separate Teacher table.",
        explanation:
          "1NF=atomic, 2NF=whole key, 3NF=nothing but the key. Each NF builds on the previous.",
      },
      {
        marks: 2,
        q: "Explain what is meant by referential integrity and why it is important in relational databases.",
        a: "Referential integrity: a rule that ensures every foreign key value in one table must match an existing primary key value in the related table. No 'orphan' records allowed.\n\nImportance: prevents invalid data (e.g. an order with a non-existent CustomerID). Ensures relationships remain consistent when records are inserted, updated, or deleted.",
        explanation:
          "FK must always point to a valid PK. Cascade delete/update helps maintain referential integrity.",
      },
      {
        marks: 4,
        q: "Explain the ACID properties of database transactions. Why are they important?",
        a: "Atomicity: a transaction is all-or-nothing. Either ALL operations in the transaction complete, or NONE do. Prevents partial updates.\n\nConsistency: a transaction brings the database from one valid state to another. All rules/constraints satisfied before and after.\n\nIsolation: concurrent transactions behave as if they run sequentially. Intermediate states invisible to other transactions. Prevents race conditions.\n\nDurability: once a transaction is committed, it persists even if the system crashes. Data written to permanent storage.\n\nImportance: essential for banking, e-commerce — ensures money transfers, orders are processed reliably.",
        explanation:
          "ACID prevents data corruption in multi-user systems. Essential for banking and financial systems.",
      },
      {
        marks: 2,
        q: "Write SQL to insert a new student (ID: 101, Name: 'Ahmed Ali', DOB: '2005-03-15') into the Student table.",
        a: "INSERT INTO Student (StudentID, Name, DOB)\nVALUES (101, 'Ahmed Ali', '2005-03-15');",
        explanation:
          "INSERT INTO specifies table + columns. VALUES provides the data in matching order.",
      },
    ],
  },

  // ─── PART 2 ───────────────────────────────────────────
  {
    id: "c12",
    part: "Part 2 – Problem Solving & Programming",
    level: "AS",
    title: "Algorithm Design & Problem Solving",
    topics: [
      "Computational thinking: decomposition, abstraction, pattern recognition",
      "Flowcharts",
      "Pseudocode conventions",
      "Trace tables",
      "Big-O complexity: O(1), O(n), O(n²), O(log n)",
      "Linear vs binary search",
    ],
    tips: [
      "CAIE pseudocode: INPUT/OUTPUT, IF/THEN/ELSE/ENDIF, WHILE/DO/ENDWHILE, FOR/TO/NEXT",
      "Binary search requires SORTED array",
      "O(1)=constant; O(log n)=binary search; O(n)=linear; O(n²)=bubble sort",
      "Trace table: one column per variable + output",
      "Decomposition = break into smaller sub-problems",
    ],
    hasDiagram: true,
    diagramQuestions: [
      {
        q: "Draw a flowchart to find the sum of all even numbers from 1 to 100. Use standard flowchart symbols: terminal, process, decision, and input/output.",
        marks: 5,
        diagramDesc:
          "Flowchart: loop 1-100, check if even, add to sum, output total",
        a: "START (oval)\n↓\nsum ← 0, n ← 1 (process rectangle)\n↓\nn ≤ 100? (diamond decision)\n↓YES                ↓NO\nn MOD 2 = 0?    OUTPUT sum (parallelogram)\n↓YES  ↓NO          ↓\nsum←sum+n  n←n+1   END (oval)\n↓         ↑\nn←n+1 ────┘\n↑\nBack to n≤100?\n\nStandard symbols: Oval=terminal, Rectangle=process, Diamond=decision, Parallelogram=I/O",
        examNote:
          "Use correct flowchart symbols. Diamond = YES/NO decision. All paths must terminate.",
      },
    ],
    questions: [
      {
        marks: 4,
        q: "Write pseudocode for a binary search on a sorted array 'data' of n integers to find a target value. Return the index if found or -1 if not found.",
        a: "FUNCTION binarySearch(data : ARRAY, n : INTEGER, target : INTEGER) : INTEGER\n  low ← 0\n  high ← n - 1\n  WHILE low <= high DO\n    mid ← (low + high) DIV 2\n    IF data[mid] = target THEN\n      RETURN mid\n    ELSE IF data[mid] < target THEN\n      low ← mid + 1\n    ELSE\n      high ← mid - 1\n    ENDIF\n  ENDWHILE\n  RETURN -1\nENDFUNCTION",
        explanation:
          "Binary search halves the search space each iteration. Must be on sorted array. O(log n).",
      },
      {
        marks: 3,
        q: "Compare linear search and binary search in terms of time complexity, requirements, and suitability.",
        a: "Linear search: O(n) — checks each element sequentially. Works on unsorted arrays. Suitable for small datasets or unsorted data.\n\nBinary search: O(log n) — halves search space each time. REQUIRES sorted array. Much faster for large datasets.\n\nExample: 1,000,000 element array: linear = up to 1,000,000 comparisons; binary = max 20 comparisons (log₂ 1,000,000 ≈ 20).",
        explanation:
          "Binary search is dramatically faster for large n, but the sorted requirement is a constraint.",
      },
      {
        marks: 3,
        q: "Trace the following pseudocode for the array [8, 3, 5, 1, 9] and show the final state.\nFOR i ← 0 TO 3\n  FOR j ← 0 TO 3-i\n    IF data[j] > data[j+1] THEN\n      temp ← data[j]\n      data[j] ← data[j+1]\n      data[j+1] ← temp\n    ENDIF\n  NEXT j\nNEXT i",
        a: "Initial: [8, 3, 5, 1, 9]\nPass 1 (i=0): 8>3→swap[3,8,5,1,9]; 8>5→swap[3,5,8,1,9]; 8>1→swap[3,5,1,8,9]; 8<9→no swap → [3,5,1,8,9]\nPass 2 (i=1): 3<5→no; 5>1→swap[3,1,5,8,9]; 5<8→no → [3,1,5,8,9]\nPass 3 (i=2): 3>1→swap[1,3,5,8,9]; 3<5→no → [1,3,5,8,9]\nPass 4 (i=3): 1<3→no → [1,3,5,8,9]\nFinal: [1, 3, 5, 8, 9]",
        explanation:
          "This is bubble sort. Show each swap clearly. The largest 'bubbles up' in each pass.",
      },
      {
        marks: 2,
        q: "Explain what is meant by abstraction in computational thinking. Give an example.",
        a: "Abstraction: the process of removing unnecessary detail to focus on the essential features of a problem. Simplifies complex systems by hiding implementation details.\n\nExample: When using a function to calculate the average of a list, the programmer only needs to know what inputs to provide and what output to expect — not how the calculation is implemented internally. The internal details are abstracted away.",
        explanation:
          "Abstraction = hiding complexity. Layers of abstraction allow manageability of complex systems.",
      },
      {
        marks: 4,
        q: "Write pseudocode to read 10 integers from the user, store them in an array, then output the maximum and minimum values.",
        a: 'DECLARE nums : ARRAY[1:10] OF INTEGER\nDECLARE i, maxVal, minVal : INTEGER\n\nFOR i ← 1 TO 10\n  INPUT nums[i]\nNEXT i\n\nmaxVal ← nums[1]\nminVal ← nums[1]\n\nFOR i ← 2 TO 10\n  IF nums[i] > maxVal THEN\n    maxVal ← nums[i]\n  ENDIF\n  IF nums[i] < minVal THEN\n    minVal ← nums[i]\n  ENDIF\nNEXT i\n\nOUTPUT "Maximum: ", maxVal\nOUTPUT "Minimum: ", minVal',
        explanation:
          "Initialise max/min with first element. Then loop from 2nd element onwards comparing each.",
      },
    ],
  },

  {
    id: "c13",
    part: "Part 2 – Problem Solving & Programming",
    level: "AS",
    title: "Data Types & Structures",
    topics: [
      "Primitive types: INTEGER, REAL, BOOLEAN, CHAR, STRING",
      "1D and 2D arrays",
      "Records",
      "Abstract data types: stack, queue, linked list",
      "Stack operations: push, pop, peek",
      "Queue operations: enqueue, dequeue",
    ],
    tips: [
      "Stack = LIFO (Last In First Out): push adds to top, pop removes from top",
      "Queue = FIFO (First In First Out): enqueue at rear, dequeue from front",
      "Linked list: each node stores data + pointer to next node",
      "Declare array: DECLARE arr : ARRAY[1:5] OF INTEGER",
      "Record: collection of fields of different data types",
    ],
    hasDiagram: true,
    diagramQuestions: [
      {
        q: "Draw diagrams showing a stack and a queue, each containing the values [10, 20, 30, 40]. Show the direction of push/pop for the stack and enqueue/dequeue for the queue. Then show the state after: Stack – pop one item; Queue – dequeue one item.",
        marks: 4,
        diagramDesc:
          "Stack (vertical, LIFO) and Queue (horizontal, FIFO) diagrams",
        a: "STACK (LIFO):\n[40] ← TOP (last pushed)\n[30]\n[20]\n[10] ← BOTTOM\nPush → adds to TOP; Pop ← removes from TOP\nAfter pop: TOP=[30], stack=[10,20,30]\n\nQUEUE (FIFO):\nFRONT → [10][20][30][40] ← REAR\nEnqueue → adds to REAR; Dequeue ← removes from FRONT\nAfter dequeue: FRONT=[20], queue=[20,30,40]",
        examNote:
          "Stack=vertical with TOP. Queue=horizontal with FRONT and REAR labels. Show direction arrows.",
      },
      {
        q: "Draw a singly-linked list containing nodes with data values 5 → 12 → 8 → 3 → NULL. Then show the state of the list after inserting the value 10 between nodes 12 and 8.",
        marks: 4,
        diagramDesc: "Linked list node boxes with data + pointer arrows",
        a: "Before insertion:\n[5|→] → [12|→] → [8|→] → [3|∅]\n\nInsert 10 between 12 and 8:\n1. Create new node: [10|→]\n2. New node's pointer → [8] (points to what 12 was pointing to)\n3. [12]'s pointer → [10] (update 12 to point to new node)\n\nAfter insertion:\n[5|→] → [12|→] → [10|→] → [8|→] → [3|∅]",
        examNote:
          "Two pointer updates needed: new node points forward, previous node points to new node.",
      },
    ],
    questions: [
      {
        marks: 3,
        q: "Describe the operations push, pop, and peek on a stack. State what error can occur and how to prevent it.",
        a: "Push: adds an element to the TOP of the stack. Stack pointer incremented.\nPop: removes and returns the element from the TOP of the stack. Stack pointer decremented.\nPeek (top): returns the element at the TOP without removing it.\n\nErrors:\n• Stack overflow: pushing onto a full stack. Prevent by checking if stack is full before pushing.\n• Stack underflow: popping from an empty stack. Prevent by checking if stack is empty before popping.",
        explanation:
          "Always mention overflow AND underflow. Check before push AND pop.",
      },
      {
        marks: 3,
        q: "Describe THREE applications of a stack data structure in computing.",
        a: "1. Function/procedure call management: return addresses and local variables pushed onto call stack when function called; popped when function returns.\n2. Undo functionality in applications: each action pushed to stack; undo pops the last action and reverses it.\n3. Expression evaluation: compilers use stacks to evaluate arithmetic expressions and convert infix to postfix notation.\n4. Web browser back button: visited URLs pushed; back button pops to return to previous page.",
        explanation:
          "Learn 3 real applications. Link stack property (LIFO) to why it's appropriate for each use.",
      },
      {
        marks: 2,
        q: "Write pseudocode to declare a 2D array to store the marks of 30 students in 5 subjects, and set all values to 0.",
        a: "DECLARE marks : ARRAY[1:30, 1:5] OF INTEGER\n\nFOR i ← 1 TO 30\n  FOR j ← 1 TO 5\n    marks[i, j] ← 0\n  NEXT j\nNEXT i",
        explanation:
          "2D array: rows=students, columns=subjects. Nested loops to initialise all elements.",
      },
      {
        marks: 4,
        q: "Explain how a queue is implemented using an array. Describe the issues that arise and how a circular queue solves them.",
        a: "Array queue: uses front and rear pointers. Enqueue: add element at rear, increment rear. Dequeue: remove from front, increment front.\n\nProblem: as items are dequeued, front pointer moves forward. Eventually rear reaches end of array even though front positions are empty — no more space despite array having capacity.\n\nCircular queue solution: when rear or front reaches the last position, it wraps around to index 0. Uses modulo arithmetic: rear = (rear + 1) MOD arraySize. This makes full use of all array positions. An empty check: front = rear. Full check: (rear + 1) MOD size = front.",
        explanation:
          "Circular queue uses MOD to wrap around. Very common exam topic.",
      },
    ],
  },

  {
    id: "c14",
    part: "Part 2 – Problem Solving & Programming",
    level: "AS",
    title: "Programming Concepts",
    topics: [
      "Variables, constants, data types",
      "Selection: IF/THEN/ELIF/ELSE/ENDIF, CASE OF",
      "Iteration: FOR, WHILE, REPEAT UNTIL",
      "Procedures and functions (BYREF vs BYVAL)",
      "String functions: LENGTH, SUBSTRING, UCASE, LCASE, ASC, CHR",
      "File operations: OPEN, READFILE, WRITEFILE, CLOSE, EOF",
    ],
    tips: [
      "FUNCTION returns a value; PROCEDURE does not return a value",
      "BYREF: changes to parameter affect original variable",
      "BYVAL: changes inside procedure do NOT affect original",
      "SUBSTRING(str, start, length) — check CAIE convention!",
      "MOD gives remainder; DIV gives integer quotient",
    ],
    hasDiagram: false,
    questions: [
      {
        marks: 3,
        q: "Explain the difference between passing a parameter by value (BYVAL) and by reference (BYREF). Give an example showing the difference.",
        a: "BYVAL: a copy of the variable is passed to the procedure. Changes inside the procedure do NOT affect the original variable.\n\nBYREF: the memory address of the variable is passed. Changes inside the procedure DO affect the original variable.\n\nExample:\nPROCEDURE double(BYVAL x : INTEGER)\n  x ← x * 2  // changes copy only\n\nPROCEDURE doubleRef(BYREF x : INTEGER)\n  x ← x * 2  // changes original\n\nIF a = 5:\ndouble(a) → a still = 5\ndoubleRef(a) → a becomes 10",
        explanation:
          "BYVAL = safe copy. BYREF = direct access to original. Use BYREF when procedure needs to modify original.",
      },
      {
        marks: 4,
        q: "Write a function in pseudocode that takes a string and returns the number of vowels (a,e,i,o,u) it contains. Use appropriate string functions.",
        a: "FUNCTION countVowels(word : STRING) : INTEGER\n  DECLARE count : INTEGER\n  DECLARE i : INTEGER\n  DECLARE ch : CHAR\n  count ← 0\n  FOR i ← 1 TO LENGTH(word)\n    ch ← SUBSTRING(word, i, 1)  // get character at position i\n    ch ← LCASE(ch)               // convert to lowercase\n    IF ch = 'a' OR ch = 'e' OR ch = 'i' OR ch = 'o' OR ch = 'u' THEN\n      count ← count + 1\n    ENDIF\n  NEXT i\n  RETURN count\nENDFUNCTION",
        explanation:
          "LENGTH returns string length. SUBSTRING extracts characters. LCASE normalises case. Loop through each character.",
      },
      {
        marks: 3,
        q: "Write pseudocode to read numbers from a file called 'scores.txt' and calculate their average. The file ends with the value -1 as a sentinel.",
        a: 'DECLARE score, total, count : INTEGER\nDECLARE average : REAL\ntotal ← 0\ncount ← 0\n\nOPEN "scores.txt" FOR READ\nREADFILE("scores.txt", score)\nWHILE score <> -1 DO\n  total ← total + score\n  count ← count + 1\n  READFILE("scores.txt", score)\nENDWHILE\nCLOSE "scores.txt"\n\nIF count > 0 THEN\n  average ← total / count\n  OUTPUT "Average: ", average\nELSE\n  OUTPUT "No scores found"\nENDIF',
        explanation:
          "Read before loop. Check sentinel BEFORE processing. Close file after. Guard against division by zero.",
      },
      {
        marks: 3,
        q: 'What is the output of the following pseudocode? Trace carefully.\nFOR i ← 1 TO 4\n  FOR j ← 1 TO i\n    OUTPUT j, " "\n  NEXT j\n  OUTPUT "\\n"\nNEXT i',
        a: "i=1: j loops 1 to 1 → outputs: 1 (newline)\ni=2: j loops 1 to 2 → outputs: 1 2 (newline)\ni=3: j loops 1 to 3 → outputs: 1 2 3 (newline)\ni=4: j loops 1 to 4 → outputs: 1 2 3 4 (newline)\n\nFull output:\n1\n1 2\n1 2 3\n1 2 3 4",
        explanation:
          "Inner loop runs i times. Output forms a triangle pattern. Trace nested loops carefully.",
      },
      {
        marks: 2,
        q: "State the difference between a procedure and a function in pseudocode.",
        a: "Function: takes parameters, performs a calculation, and RETURNS a value. Used within expressions.\nExample: result ← calculateArea(5, 3)\n\nProcedure: takes parameters, performs actions (may modify variables via BYREF), but does NOT return a value. Called as a statement.\nExample: displayMenu(options)",
        explanation:
          "Function = returns value. Procedure = no return value. This distinction is very commonly tested.",
      },
    ],
  },

  {
    id: "c15",
    part: "Part 2 – Problem Solving & Programming",
    level: "AS",
    title: "Software Development",
    topics: [
      "SDLC stages: analysis, design, coding, testing, maintenance",
      "Testing: unit, integration, system, acceptance",
      "Black box vs white box testing",
      "Test data: normal, boundary, erroneous",
      "Debugging techniques",
      "Agile vs Waterfall methodologies",
      "Types of maintenance: corrective, adaptive, perfective",
    ],
    tips: [
      "Black box: tests what program does (inputs/outputs) WITHOUT looking at code",
      "White box: tests HOW program works — looks at all code paths",
      "Test with: normal values (typical), boundary values (at limits), erroneous values (invalid)",
      "Waterfall: sequential, rigid; Agile: iterative, flexible",
      "Corrective=fix bugs; Adaptive=change environment; Perfective=improve performance",
    ],
    hasDiagram: false,
    questions: [
      {
        marks: 3,
        q: "Distinguish between black-box testing and white-box testing. Give ONE example of each.",
        a: "Black-box testing: tests the program from the user's perspective based on specifications. Tester does NOT see the source code. Checks that for given inputs, correct outputs are produced.\nExample: Testing a login form — enter valid/invalid credentials, check if correct message appears.\n\nWhite-box (glass-box) testing: tester has full access to source code. Tests internal logic, all code paths, branches, and loops to ensure complete coverage.\nExample: Testing that every branch of an IF/ELSE statement is executed correctly by choosing inputs that trigger each path.",
        explanation:
          "Black=external behaviour. White=internal structure. Both are needed for thorough testing.",
      },
      {
        marks: 3,
        q: "For a function that accepts an integer between 1 and 100, design a test plan with appropriate test data covering normal, boundary, and erroneous cases.",
        a: "Test Type     | Input | Expected Output    | Reason\nNormal        |  50   | Accepted/processed | Typical value in range\nBoundary low  |   1   | Accepted           | Minimum valid value\nBoundary high | 100   | Accepted           | Maximum valid value\nBoundary below|   0   | Error message      | Just outside lower limit\nBoundary above| 101   | Error message      | Just outside upper limit\nErroneous     | -5    | Error message      | Negative number\nErroneous     | 'abc' | Error message      | Wrong data type\nErroneous     | 50.5  | Error message      | Non-integer",
        explanation:
          "Always test both sides of boundaries. Erroneous = completely wrong type or value.",
      },
      {
        marks: 4,
        q: "Compare the Waterfall and Agile software development methodologies. State ONE scenario where each is more appropriate.",
        a: "Waterfall: sequential phases (requirements → design → implementation → testing → maintenance). Each phase must complete before the next begins. Documentation-heavy. Changes are costly once development has started.\nAppropriate: safety-critical systems (medical devices, aircraft control) where requirements are fixed, well-understood, and changes dangerous.\n\nAgile: iterative sprints (short development cycles). Working software delivered frequently. Requirements can change. Continuous client involvement. Less documentation.\nAppropriate: web/mobile app development where requirements evolve, client feedback is frequent, and fast delivery is needed (e.g. startup product).",
        explanation:
          "Waterfall=rigid+documented. Agile=flexible+iterative. Neither is universally better; context determines choice.",
      },
      {
        marks: 2,
        q: "State the THREE types of software maintenance and give an example of each.",
        a: "1. Corrective maintenance: fixing errors/bugs found after release.\nExample: Patching a security vulnerability discovered in production.\n\n2. Adaptive maintenance: modifying software to work in a changed environment.\nExample: Updating software to work with a new operating system version.\n\n3. Perfective maintenance: improving performance or adding new features.\nExample: Optimising a slow database query to improve response time.",
        explanation:
          "Know all 3 types by name AND example. Perfective = improvement (not fixing bugs).",
      },
    ],
  },

  // ─── PART 3 ───────────────────────────────────────────
  {
    id: "c16",
    part: "Part 3 – Advanced Theory",
    level: "A2",
    title: "Data Representation (Advanced)",
    topics: [
      "Floating point binary representation",
      "Normalisation of floating point",
      "Mantissa and exponent",
      "Precision vs range",
      "Overflow and underflow",
      "Lossless vs lossy compression",
      "Run-length encoding (advanced)",
      "Dictionary coding (LZW)",
    ],
    tips: [
      "FP format: [sign bit][exponent][mantissa] (varies by standard)",
      "Normalised positive: 0.1xxx... Normalised negative: 1.0xxx...",
      "More mantissa bits = greater precision; More exponent bits = greater range",
      "Overflow: result too large; Underflow: result too small (close to zero)",
      "Lossy: reduces quality (JPEG, MP3); Lossless: no quality loss (PNG, FLAC, ZIP)",
    ],
    hasDiagram: true,
    diagramQuestions: [
      {
        q: "A floating point number uses 1 sign bit, 6-bit exponent (two's complement), and 8-bit mantissa. Show how to represent +0.75 in this format. Show normalisation steps.",
        marks: 5,
        diagramDesc: "FP bit layout: [S][EEEEEE][MMMMMMMM]",
        a: "+0.75 in binary = 0.11 (0.5 + 0.25 = 0.75)\n\nNormalised form: 0.11000000 × 2⁰\n(already normalised: positive number starts with 0.1)\n\nSign bit: 0 (positive)\nMantissa: 11000000 (after the '0.' point)\nExponent: 0 = 000000 in 6-bit two's complement\n\nFull representation:\n0 | 000000 | 11000000\n\nVerify: 0.11000000 × 2⁰ = 0.11 binary = 0.75 ✓",
        examNote:
          "Normalised form: positive = 0.1..., negative = 1.0... Store mantissa AFTER implied '0.' point.",
      },
    ],
    questions: [
      {
        marks: 3,
        q: "Explain why normalisation of floating point numbers is important. Describe the normalised form for positive and negative numbers.",
        a: "Normalisation ensures maximum precision for a given number of mantissa bits by removing leading zeros (for positive) or leading ones (for negative).\n\nNormalised positive: mantissa starts with 0.1 (first bit after point is 1). Ensures no wasted leading zeros.\nNormalised negative: mantissa starts with 1.0 (first bit after point is 0). Mirrors positive convention.\n\nIf not normalised, the same value could have multiple representations, and precision is wasted on leading bits.",
        explanation:
          "Normalisation = one unique representation + maximum precision. 0.0001... wastes mantissa bits.",
      },
      {
        marks: 3,
        q: "Compare lossy and lossless compression. Give ONE example of each and state when each type is appropriate.",
        a: "Lossless compression: the original data can be perfectly reconstructed from the compressed version. No data is lost.\nExample: PNG images, ZIP files, FLAC audio.\nAppropriate: text files, executable programs, medical images — where exact data is critical.\n\nLossy compression: achieves higher compression by permanently removing some data (usually imperceptible details).\nExample: JPEG images, MP3 audio, MP4 video.\nAppropriate: streaming media, photos on websites — where small quality reduction is acceptable for much smaller file sizes.",
        explanation:
          "Lossy = irreversible, higher compression. Lossless = reversible, lower compression. Choose based on use case.",
      },
      {
        marks: 4,
        q: "Explain the concept of precision and range in floating point representation. Describe how changing the allocation of bits between mantissa and exponent affects each.",
        a: "Precision: the number of significant figures that can be accurately represented. Determined by the number of mantissa bits. More mantissa bits = finer granularity between representable numbers = higher precision.\n\nRange: the largest and smallest values that can be represented. Determined by the number of exponent bits. More exponent bits = larger range of powers of 2 = wider range.\n\nTrade-off: for a fixed total number of bits:\n• More mantissa bits → higher precision, smaller range\n• More exponent bits → larger range, lower precision\n\nExample: 32-bit float (IEEE 754): 23-bit mantissa + 8-bit exponent + 1 sign bit. 64-bit double: 52-bit mantissa + 11-bit exponent.",
        explanation:
          "Fixed bit count creates a trade-off. More mantissa = precise but narrow range. More exponent = wide range but imprecise.",
      },
    ],
  },

  {
    id: "c17",
    part: "Part 3 – Advanced Theory",
    level: "A2",
    title: "Communication & Internet Technologies (Advanced)",
    topics: [
      "IPv4 vs IPv6 addressing",
      "Subnetting and CIDR notation",
      "NAT (Network Address Translation)",
      "TCP three-way handshake",
      "BitTorrent and P2P networks",
      "Packet switching revisited",
      "Latency and throughput factors",
      "VPN",
    ],
    tips: [
      "IPv4: 32 bits, 4 octets (e.g. 192.168.1.1); IPv6: 128 bits, 8 groups of 4 hex",
      "Subnet mask: 255.255.255.0 = /24 (24 network bits, 8 host bits)",
      "NAT allows multiple devices to share one public IP",
      "TCP handshake: SYN → SYN-ACK → ACK",
      "VPN encrypts traffic and masks IP address",
    ],
    hasDiagram: true,
    diagramQuestions: [
      {
        q: "Draw a diagram showing the TCP three-way handshake between a client and server. Label each packet with its flags and sequence numbers.",
        marks: 4,
        diagramDesc: "Client-Server TCP handshake: 3 arrows with flags",
        a: "CLIENT                          SERVER\n  |                                |\n  |──── SYN (seq=100) ──────────→ |\n  |                                |\n  |← SYN-ACK (seq=200, ack=101) ──|\n  |                                |\n  |──── ACK (ack=201) ──────────→ |\n  |                                |\n  |═══ Connection Established ════|\n\nStep 1: Client sends SYN (wants to connect)\nStep 2: Server responds SYN-ACK (agrees + its own SYN)\nStep 3: Client sends ACK (confirms server's SYN)\nConnection established after 3 steps.",
        examNote:
          "SYN=synchronise, ACK=acknowledge. Each side must SYN and receive ACK. Hence 3-way.",
      },
    ],
    questions: [
      {
        marks: 3,
        q: "Explain why IPv6 was developed to replace IPv4. State TWO technical differences between them.",
        a: "IPv4 uses 32-bit addresses providing ~4.3 billion unique addresses. With the explosive growth of internet-connected devices (smartphones, IoT), IPv4 addresses are exhausted. IPv6 was developed to solve this.\n\nDifferences:\n1. Address length: IPv4 = 32 bits; IPv6 = 128 bits (providing 3.4 × 10³⁸ addresses)\n2. Notation: IPv4 uses decimal dotted notation (192.168.1.1); IPv6 uses hexadecimal colon notation (2001:0db8::1)\n3. IPv6 eliminates need for NAT; has built-in security (IPSec); better support for QoS",
        explanation:
          "IPv4 exhaustion drove IPv6. 128 bits = essentially unlimited addresses for foreseeable future.",
      },
      {
        marks: 2,
        q: "Explain the purpose of Network Address Translation (NAT).",
        a: "NAT allows multiple devices on a private local network to share a single public IP address when communicating with the internet. The NAT device (router) replaces private IP addresses with its public IP for outgoing packets, and reverses this for incoming replies.\n\nPurpose: conserves limited IPv4 public addresses; provides basic security (internal IPs not exposed to internet.",
        explanation:
          "NAT = many private IPs → one public IP. Solves IPv4 exhaustion. Every home router uses NAT.",
      },
      {
        marks: 3,
        q: "Describe how a BitTorrent (P2P) network differs from a client-server network for file distribution. State ONE advantage and ONE disadvantage of P2P.",
        a: "Client-server: a central server stores files. All clients download from the server. Server is single point of failure; can become bottleneck with many simultaneous downloads.\n\nBitTorrent (P2P): file is divided into pieces distributed across many peers. Each peer simultaneously downloads pieces from multiple peers AND uploads pieces they have to others. No central server for content (though a tracker/DHT coordinates peers).\n\nAdvantage: scales well — more peers means faster download speeds; no single point of failure; server bandwidth costs eliminated.\nDisadvantage: initial download slow if few seeders; users can stop seeding (free-rider problem); harder to enforce copyright.",
        explanation:
          "P2P distributes both storage and bandwidth across all users. Highly scalable but depends on seeder availability.",
      },
    ],
  },

  {
    id: "c18",
    part: "Part 3 – Advanced Theory",
    level: "A2",
    title: "Hardware & Virtual Machines",
    topics: [
      "Virtual machines and hypervisors (Type 1 and Type 2)",
      "Emulation vs virtualisation",
      "Cloud computing (IaaS, PaaS, SaaS)",
      "GPU vs CPU",
      "CISC vs RISC pipelining",
      "Multicore processors",
      "Superscalar processors",
    ],
    tips: [
      "Type 1 hypervisor runs directly on hardware (bare metal) — e.g. VMware ESXi",
      "Type 2 hypervisor runs on top of a host OS — e.g. VirtualBox",
      "IaaS=infrastructure; PaaS=platform; SaaS=software",
      "GPU: thousands of simpler cores for parallel tasks; CPU: fewer, powerful cores for sequential tasks",
      "Emulation = software simulating different hardware; Virtualisation = partitioning same hardware",
    ],
    hasDiagram: true,
    diagramQuestions: [
      {
        q: "Draw diagrams showing the difference between Type 1 and Type 2 hypervisors. Label all layers clearly.",
        marks: 4,
        diagramDesc: "Two side-by-side stack diagrams showing hypervisor types",
        a: "TYPE 1 (Bare Metal):          TYPE 2 (Hosted):\n[VM1][VM2][VM3]              [VM1][VM2]\n[Hypervisor (Type 1)]        [Hypervisor (Type 2)]\n[Hardware]                   [Host OS]\n                             [Hardware]\n\nType 1: hypervisor runs directly on physical hardware. More efficient, lower overhead. Used in enterprise (VMware ESXi, Hyper-V).\n\nType 2: hypervisor runs as application on top of host OS. Easier to install, less efficient. Used for development/testing (VirtualBox, VMware Workstation).",
        examNote:
          "Type 1 = more efficient (no host OS overhead). Type 2 = easier to set up. Label layers exactly.",
      },
    ],
    questions: [
      {
        marks: 3,
        q: "Explain THREE benefits of using virtual machines in software development.",
        a: "1. Multiple OS environments on one machine: developers can test software on Windows, Linux, and macOS without multiple physical computers.\n2. Snapshot and rollback: VM state can be saved at any point; if testing causes issues, roll back to clean snapshot instantly.\n3. Isolation: each VM is isolated; malware or crashes in one VM cannot affect others or the host system.\n4. Cost efficiency: one physical server can host multiple VMs, reducing hardware costs.\n5. Easy deployment/migration: VMs can be packaged and moved between hardware.",
        explanation:
          "3 distinct benefits for 3 marks. Focus on practical advantages for developers specifically.",
      },
      {
        marks: 3,
        q: "Distinguish between cloud computing service models: IaaS, PaaS, and SaaS. Give an example of each.",
        a: "IaaS (Infrastructure as a Service): provides virtualised computing resources (servers, storage, networking) over the internet. Customer manages OS and above.\nExample: Amazon EC2, Google Compute Engine.\n\nPaaS (Platform as a Service): provides a platform for developing, testing, and deploying applications. Customer manages applications and data only.\nExample: Heroku, Google App Engine, AWS Elastic Beanstalk.\n\nSaaS (Software as a Service): delivers complete software applications over the internet. Customer only uses the application.\nExample: Google Docs, Microsoft 365, Salesforce.",
        explanation:
          "IaaS=raw hardware. PaaS=development environment. SaaS=ready-to-use software. Each layer builds on previous.",
      },
      {
        marks: 2,
        q: "Explain why GPUs are used for machine learning tasks rather than CPUs.",
        a: "GPUs contain thousands of smaller, simpler processing cores designed for parallel computation. Machine learning involves performing the same mathematical operations (matrix multiplications) on millions of values simultaneously — perfectly suited for GPU parallelism.\n\nCPUs have fewer (4-64) powerful cores optimised for sequential processing of complex tasks. This is much less efficient for the massive parallelism required in neural network training.",
        explanation:
          "GPU = parallel (thousands of simple cores). CPU = sequential (few powerful cores). ML = massively parallel maths.",
      },
    ],
  },

  {
    id: "c19",
    part: "Part 3 – Advanced Theory",
    level: "A2",
    title: "Logic Circuits & Boolean Algebra (Advanced)",
    topics: [
      "4-variable Karnaugh maps",
      "Boolean algebra simplification laws (all)",
      "Multiplexers (MUX)",
      "Demultiplexers (DEMUX)",
      "Decoders and encoders",
      "Programmable logic devices",
      "ALU design",
    ],
    tips: [
      "4-var K-map: 4×4 grid, Gray code ordering on both axes",
      "Groups must wrap: top-bottom AND left-right edges are adjacent",
      "Multiplexer: 2ⁿ data inputs + n select lines → 1 output",
      "Consensus theorem: AB + AC + BC = AB + AC (BC is redundant)",
      "PLD: programmable hardware logic using AND-OR arrays",
    ],
    hasDiagram: true,
    diagramQuestions: [
      {
        q: "Using a 4-variable Karnaugh map, simplify F(A,B,C,D) = Σ(0,1,4,5,7,11,15). Show all groups and write the minimised SOP expression.",
        marks: 6,
        diagramDesc: "4×4 K-map with minterms 0,1,4,5,7,11,15",
        a: "K-map (AB vs CD, Gray code):\n     CD: 00  01  11  10\nAB:00:  1   1   0   0   (minterms 0,1)\nAB:01:  1   1   1   0   (minterms 4,5,7)\nAB:11:  0   1   1   0   (minterms 11,15)\nAB:10:  0   0   0   0\n\nGroups:\nGroup 1: {0,1,4,5} → A=0,C=0 regardless of B,D → A'C'\nGroup 2: {5,7,15,13}... check {5,7} → A=0,B=1,D=1 → A'BD  \nGroup 3: {7,15,11}... {7,15}: B=1,C=1,D=1 → BCD\n\nSimplified: F = A'C' + BCD (verify with each minterm)\n(Exact grouping depends on largest valid groups found)",
        examNote:
          "Largest groups first. Each cell can be in multiple groups. Read off variables that DON'T change within group.",
      },
    ],
    questions: [
      {
        marks: 3,
        q: "Explain how a 4-to-1 multiplexer works. State its inputs and how the output is determined.",
        a: "A 4-to-1 MUX has: 4 data inputs (D0, D1, D2, D3), 2 select inputs (S1, S0), and 1 output (Y).\n\nOperation: The select inputs determine which data input is connected to the output:\nS1=0, S0=0 → Y = D0\nS1=0, S0=1 → Y = D1\nS1=1, S0=0 → Y = D2\nS1=1, S0=1 → Y = D3\n\nBoolean: Y = D0·S1'S0' + D1·S1'S0 + D2·S1S0' + D3·S1S0\n\nUse: routes one of N signals to a single output line based on selection code.",
        explanation:
          "2ⁿ inputs needs n select lines. MUX = data selector. Used in CPU to select register/bus sources.",
      },
      {
        marks: 4,
        q: "Using Boolean algebra, prove that A + A'B = A + B.",
        a: "LHS = A + A'B\n= (A + A')(A + B)    [by distribution law: X + YZ = (X+Y)(X+Z)]\n= 1 · (A + B)        [since A + A' = 1]\n= A + B              [since 1 · X = X]\n= RHS ✓\n\nAlternative proof:\nA + A'B = A·1 + A'B\n= A(B + B') + A'B   [since B+B'=1]\n= AB + AB' + A'B\n= AB + AB' + AB + A'B  [adding extra AB]\n= AB + (AB + A'B) + AB'\n= AB + B + AB'          [since AB + A'B = B]\n= B(A+1) + AB'\n= B + AB' = A + B ✓",
        explanation:
          "Use distribution, complement, and identity laws. Show each step clearly with law name.",
      },
    ],
  },

  {
    id: "c20",
    part: "Part 3 – Advanced Theory",
    level: "A2",
    title: "System Software (Advanced)",
    topics: [
      "Memory management: paging and segmentation",
      "Thrashing",
      "Process scheduling: FCFS, SJF, Round Robin, Priority",
      "Real-time operating systems (RTOS)",
      "Deadlock: conditions and prevention",
      "Bootloader and BIOS/UEFI",
    ],
    tips: [
      "Thrashing = excessive page faults, CPU spends more time swapping than executing",
      "Deadlock requires ALL 4 Coffman conditions: mutual exclusion, hold-and-wait, no preemption, circular wait",
      "Prevent deadlock: break any one Coffman condition",
      "RTOS guarantees response time — used in medical/industrial systems",
      "SJF minimises average waiting time but requires knowing burst time in advance",
    ],
    hasDiagram: true,
    diagramQuestions: [
      {
        q: "Draw a Gantt chart for the following processes using Round Robin scheduling with time quantum=2. Processes: P1(burst=5), P2(burst=3), P3(burst=1), P4(burst=4). All arrive at time 0.",
        marks: 5,
        diagramDesc: "Gantt chart timeline for Round Robin scheduling",
        a: "Round Robin, quantum=2, arrival order: P1,P2,P3,P4\n\nQueue at t=0: [P1,P2,P3,P4]\nt= 0-2: P1 runs (5-2=3 remaining)\nt= 2-4: P2 runs (3-2=1 remaining)\nt= 4-5: P3 runs (1-1=0, completes at t=5) ✓\nt= 5-7: P4 runs (4-2=2 remaining)\nt= 7-9: P1 runs (3-2=1 remaining)\nt= 9-10: P2 runs (1-1=0, completes at t=10) ✓\nt=10-12: P4 runs (2-2=0, completes at t=12) ✓\nt=12-13: P1 runs (1-1=0, completes at t=13) ✓\n\nGantt: |P1|P1|P2|P2|P3|P4|P4|P1|P1|P2|P4|P4|P1|\n        0  2  4  5  7  9 10 12 13",
        examNote:
          "After quantum expires, put process at BACK of queue. Show remaining time for each process.",
      },
    ],
    questions: [
      {
        marks: 4,
        q: "Describe the four conditions necessary for deadlock to occur. For each, state how it could be prevented.",
        a: "1. Mutual exclusion: resources can only be held by one process at a time.\nPrevention: make resources sharable where possible.\n\n2. Hold and wait: a process holds at least one resource while waiting to acquire others.\nPrevention: require processes to request ALL needed resources at once before starting.\n\n3. No preemption: resources cannot be forcibly taken from a process.\nPrevention: allow OS to preempt (forcibly take) resources from waiting processes.\n\n4. Circular wait: a circular chain of processes exists where each waits for a resource held by the next.\nPrevention: impose a global ordering on resources; processes must request in ascending order.",
        explanation:
          "All 4 conditions must occur simultaneously for deadlock. Breaking ANY ONE prevents deadlock.",
      },
      {
        marks: 3,
        q: "Explain thrashing in the context of virtual memory. State its cause and how it can be prevented.",
        a: "Thrashing: a condition where the OS spends more time swapping pages between RAM and disk than executing useful instructions. CPU utilisation drops dramatically.\n\nCause: too many processes are active simultaneously, each requiring more pages than available RAM. Almost every memory access causes a page fault, requiring a disk swap.\n\nPrevention:\n1. Reduce the number of concurrent processes (reduce degree of multiprogramming)\n2. Increase physical RAM\n3. Use a better page replacement algorithm (e.g. Least Recently Used instead of random)\n4. Use working set model to ensure each process has its frequently needed pages in RAM",
        explanation:
          "Thrashing = constant page faults. CPU busy swapping, not computing. Solution: more RAM or fewer processes.",
      },
    ],
  },

  {
    id: "c21",
    part: "Part 3 – Advanced Theory",
    level: "A2",
    title: "Security (Advanced)",
    topics: [
      "Public Key Infrastructure (PKI)",
      "Certificate Authorities (CA)",
      "TLS/SSL handshake process",
      "SQL injection attacks and prevention",
      "Cross-site scripting (XSS)",
      "Penetration testing",
      "Social engineering attacks",
    ],
    tips: [
      "PKI: CA signs certificate containing public key + identity",
      "TLS handshake: ClientHello → ServerHello+Cert → Key Exchange → Finished",
      "Prepared statements prevent SQL injection",
      "XSS: malicious scripts injected into web pages",
      "Pen testing: ethical hacking WITH permission to find vulnerabilities",
      "Phishing = social engineering via email",
    ],
    hasDiagram: false,
    questions: [
      {
        marks: 4,
        q: "Describe the TLS handshake process. Explain why both symmetric and asymmetric encryption are used.",
        a: "TLS Handshake process:\n1. ClientHello: client sends supported cipher suites, TLS version, random number.\n2. ServerHello + Certificate: server selects cipher, sends certificate (containing public key, signed by CA).\n3. Client verifies certificate with CA's public key.\n4. Key Exchange: client generates pre-master secret, encrypts with server's public key, sends to server.\n5. Both sides derive session key from pre-master secret.\n6. Finished: both sides confirm using session key — connection secured.\n\nWhy both?\nAsymmetric (during handshake): secure key exchange — public key encrypts pre-master secret, only server's private key can decrypt.\nSymmetric (during data transfer): much faster than asymmetric — used for actual data encryption once session key established.",
        explanation:
          "Asymmetric for key exchange (slow but secure). Symmetric for data (fast). HTTPS uses both.",
      },
      {
        marks: 3,
        q: "Explain how a SQL injection attack works. Show an example and describe how to prevent it.",
        a: "SQL injection: an attacker inserts SQL commands into input fields that are then executed by the database.\n\nExample:\nLogin form: username input → 'admin'--\nQuery becomes: SELECT * FROM users WHERE username='admin'--' AND password='...'\nThe '--' comments out the password check → attacker logs in as admin without password!\n\nPrevention:\n1. Prepared statements (parameterised queries): SQL structure defined separately from data. Inputs treated as data, never as SQL code. Most effective.\n2. Input validation: reject suspicious characters (<, >, ', --, etc.)\n3. Stored procedures: use predefined database procedures\n4. Principle of least privilege: DB user account should only have necessary permissions",
        explanation:
          "SQL injection exploits unsanitised input. Prepared statements completely prevent it.",
      },
      {
        marks: 3,
        q: "Describe penetration testing. State THREE activities that a penetration tester might carry out.",
        a: "Penetration testing (ethical hacking): authorised attempt to compromise a system's security to identify vulnerabilities before malicious attackers do. Conducted with explicit permission and under a defined scope.\n\nActivities:\n1. Reconnaissance: gather information about the target (network scanning, WHOIS lookups, social media research).\n2. Vulnerability scanning: use automated tools to identify known vulnerabilities in software versions, configurations.\n3. Exploitation: attempt to exploit discovered vulnerabilities to gain unauthorised access (controlled and documented).\n4. Social engineering: test staff awareness by simulating phishing emails or pretexting calls.\n5. Password cracking: test password strength using dictionary attacks or brute force.\n6. Reporting: document all findings, risk levels, and remediation recommendations.",
        explanation:
          "Pen testing = authorised attack simulation. Must have written permission. Report findings to improve security.",
      },
    ],
  },

  {
    id: "c22",
    part: "Part 3 – Advanced Theory",
    level: "A2",
    title: "Artificial Intelligence",
    topics: [
      "Machine learning types: supervised, unsupervised, reinforcement",
      "Neural networks: structure, weights, activation functions",
      "Training and backpropagation",
      "Natural Language Processing (NLP)",
      "Expert systems: knowledge base + inference engine",
      "Turing test",
      "Heuristics",
      "Ethical issues in AI",
    ],
    tips: [
      "Supervised: labelled training data; learns to classify/predict",
      "Unsupervised: finds patterns/clusters without labels",
      "Reinforcement: agent learns from reward/punishment",
      "Neural net: input layer → hidden layers → output layer",
      "Backpropagation: adjusts weights to minimise error",
      "Expert system: cannot learn; only as good as its knowledge base",
    ],
    hasDiagram: true,
    diagramQuestions: [
      {
        q: "Draw a diagram of a simple neural network with 2 input nodes, 3 hidden nodes (1 layer), and 2 output nodes. Label: inputs, weights, activation functions, and outputs.",
        marks: 4,
        diagramDesc:
          "Neural network diagram with nodes and weighted connections",
        a: "Input Layer    Hidden Layer    Output Layer\n[I1] ──w11──→ [H1] ──w41──→ [O1]\n     ──w12──→        ──w42──↗\n[I2] ──w21──→ [H2] ──w43──→ [O2]\n     ──w22──→ [H3] ──w44──↗\n     ──w23──↗\n\nEach connection has a WEIGHT (w)\nEach hidden/output node applies ACTIVATION FUNCTION (e.g. sigmoid, ReLU)\nTraining adjusts weights using backpropagation to minimise output error",
        examNote:
          "Label weights on connections. State activation function at nodes. Input layer has no activation.",
      },
    ],
    questions: [
      {
        marks: 3,
        q: "Distinguish between supervised, unsupervised, and reinforcement machine learning. Give ONE example of each.",
        a: "Supervised learning: trained on labelled data (input-output pairs). Learns to map inputs to correct outputs.\nExample: Email spam classification (emails labelled 'spam'/'not spam').\n\nUnsupervised learning: trained on unlabelled data. Finds patterns, structures, or clusters without guidance.\nExample: Customer segmentation — grouping customers by purchasing behaviour without predefined categories.\n\nReinforcement learning: an agent learns by interacting with an environment, receiving rewards for correct actions and penalties for wrong ones.\nExample: Game-playing AI (AlphaGo, chess engines) learns optimal moves through millions of games.",
        explanation:
          "Supervised=labelled, Unsupervised=unlabelled patterns, Reinforcement=rewards. Know an example for each.",
      },
      {
        marks: 4,
        q: "Describe the structure and components of an expert system. State TWO limitations of expert systems.",
        a: "An expert system consists of:\n1. Knowledge base: a collection of facts and rules about a specific domain, provided by human experts. Contains IF-THEN rules.\n2. Inference engine: processes queries by applying rules from the knowledge base using forward chaining (facts→conclusions) or backward chaining (goal→required facts).\n3. Working memory: stores facts established during a session.\n4. User interface: allows non-experts to query the system and receive advice.\n5. Explanation facility: explains how a conclusion was reached.\n\nLimitations:\n1. Cannot learn or update its knowledge base automatically — requires manual updates by experts.\n2. Only as good as the knowledge provided — errors in knowledge base lead to wrong conclusions.\n3. Cannot handle situations outside its domain knowledge.\n4. Acquiring knowledge from experts is time-consuming and expensive.",
        explanation:
          "Expert system = rules + inference engine. Cannot learn (unlike ML). Great for narrow, well-defined domains.",
      },
      {
        marks: 2,
        q: "Explain the Turing test. State a criticism of it as a measure of machine intelligence.",
        a: "Turing test: a human evaluator holds conversations (via text) with both a human and a machine. If the evaluator cannot reliably distinguish which is the machine, the machine is considered to have demonstrated human-level intelligence.\n\nCriticism: The Turing test only measures the ability to mimic human conversation, not true understanding or intelligence. A machine could pass by producing plausible-sounding text (like modern LLMs) without any genuine comprehension, consciousness, or reasoning ability. The Chinese Room thought experiment illustrates this limitation.",
        explanation:
          "Turing test = conversation-based intelligence test. Criticism: mimicry ≠ understanding. Chinese Room argument.",
      },
    ],
  },

  // ─── PART 4 ───────────────────────────────────────────
  {
    id: "c23",
    part: "Part 4 – Further Problem Solving & Programming (Practical)",
    level: "A2",
    title: "Algorithms",
    topics: [
      "Bubble sort",
      "Insertion sort",
      "Merge sort",
      "Quick sort",
      "Linear search",
      "Binary search",
      "Breadth-first search (BFS)",
      "Depth-first search (DFS)",
    ],
    tips: [
      "Bubble: O(n²) worst, O(n) best; simple but slow",
      "Insertion: O(n²) worst, O(n) best for nearly-sorted data",
      "Merge: O(n log n) always; divide-and-conquer; needs extra space",
      "Quick: O(n log n) average, O(n²) worst (bad pivot); in-place",
      "BFS: uses queue; finds shortest path in unweighted graph",
      "DFS: uses stack/recursion; explores as far as possible first",
    ],
    hasDiagram: true,
    diagramQuestions: [
      {
        q: "Show the steps of merge sort on the array [38, 27, 43, 3, 9, 82, 10]. Draw the complete split and merge tree.",
        marks: 6,
        diagramDesc:
          "Merge sort tree: split down to single elements then merge back up",
        a: "Split phase:\n[38,27,43,3,9,82,10]\n    ↙           ↘\n[38,27,43]    [3,9,82,10]\n  ↙    ↘       ↙      ↘\n[38] [27,43]  [3,9]  [82,10]\n      ↙  ↘    ↙  ↘    ↙   ↘\n    [27][43] [3][9] [82] [10]\n\nMerge phase (sorted):\n[27,43]     [3,9]   [10,82]\n[27,38,43]  [3,9,10,82]\n[3,9,10,27,38,43,82] ✓\n\nTime: O(n log n) | Space: O(n) for temp arrays",
        examNote:
          "Draw the complete tree. Show both split AND merge phases. Final array must be sorted.",
      },
      {
        q: "Show the complete steps of quick sort on [7, 2, 1, 6, 8, 5, 3, 4] using the last element as pivot. Show partitioning at each step.",
        marks: 5,
        diagramDesc: "Quick sort partition tree with pivot selection",
        a: "Initial: [7,2,1,6,8,5,3,4] pivot=4\nPartition: elements≤4 left, >4 right\n→ [2,1,3,4,8,5,7,6] → pivot 4 at index 3\nLeft: [2,1,3] pivot=3 → [1,2,3]\nRight: [8,5,7,6] pivot=6 → [5,6,8,7]\n  [5,6,8,7]: left=[5], right=[8,7] pivot=7→[7,8]\nFinal: [1,2,3,4,5,6,7,8] ✓",
        examNote:
          "Show pivot selection, partition result, and recursive subproblems. Label pivots clearly.",
      },
    ],
    questions: [
      {
        marks: 5,
        q: "Write pseudocode for merge sort. Include both the split and merge functions.",
        a: "FUNCTION mergeSort(arr : ARRAY, n : INTEGER) : ARRAY\n  IF n <= 1 THEN RETURN arr\n  mid ← n DIV 2\n  left ← mergeSort(arr[0:mid], mid)\n  right ← mergeSort(arr[mid:n], n-mid)\n  RETURN merge(left, right)\nENDFUNCTION\n\nFUNCTION merge(left, right : ARRAY) : ARRAY\n  DECLARE result : ARRAY\n  i ← 0\n  j ← 0\n  WHILE i < LENGTH(left) AND j < LENGTH(right) DO\n    IF left[i] <= right[j] THEN\n      APPEND result, left[i]\n      i ← i + 1\n    ELSE\n      APPEND result, right[j]\n      j ← j + 1\n    ENDIF\n  ENDWHILE\n  // Append remaining elements\n  WHILE i < LENGTH(left) DO APPEND result, left[i]; i←i+1 ENDWHILE\n  WHILE j < LENGTH(right) DO APPEND result, right[j]; j←j+1 ENDWHILE\n  RETURN result\nENDFUNCTION",
        explanation:
          "Merge sort: split recursively until single elements, then merge back in sorted order.",
      },
      {
        marks: 4,
        q: "Compare quick sort and merge sort in terms of: time complexity (best/worst/average), space complexity, and when each is preferred.",
        a: "Merge Sort:\n• Time: O(n log n) — always (best, worst, average)\n• Space: O(n) — needs temporary arrays for merging\n• Preferred: when stable sort needed; linked lists; predictable performance required\n\nQuick Sort:\n• Time: O(n log n) average; O(n²) worst case (sorted array with bad pivot)\n• Space: O(log n) — in-place (only recursion stack)\n• Preferred: arrays in practice (cache-friendly); usually faster than merge sort due to smaller constant\n\nKey difference: Quick sort can degrade on already-sorted data; Merge sort is consistently O(n log n) but uses more memory.",
        explanation:
          "Quick sort faster in practice; Merge sort more predictable. Both O(n log n) on average.",
      },
      {
        marks: 4,
        q: "Write pseudocode for Breadth-First Search (BFS) on a graph. Describe what data structure is used and why.",
        a: "PROCEDURE BFS(graph, startNode)\n  DECLARE visited : SET\n  DECLARE queue : QUEUE\n  ENQUEUE queue, startNode\n  ADD startNode TO visited\n  WHILE queue NOT EMPTY DO\n    current ← DEQUEUE(queue)\n    OUTPUT current\n    FOR EACH neighbour IN graph[current] DO\n      IF neighbour NOT IN visited THEN\n        ADD neighbour TO visited\n        ENQUEUE queue, neighbour\n      ENDIF\n    NEXT neighbour\n  ENDWHILE\nENDPROCEDURE\n\nData structure: QUEUE (FIFO)\nWhy: BFS explores level by level (all nodes at distance 1, then distance 2, etc.). FIFO ensures nearest unvisited nodes are processed first, guaranteeing shortest path in unweighted graphs.",
        explanation:
          "BFS uses Queue (FIFO). DFS uses Stack (LIFO). BFS = level-order. DFS = depth-first.",
      },
    ],
  },

  {
    id: "c24",
    part: "Part 4 – Further Problem Solving & Programming (Practical)",
    level: "A2",
    title: "Recursion",
    topics: [
      "Base case and recursive case",
      "Call stack and stack frames",
      "Recursive vs iterative solutions",
      "Fibonacci sequence",
      "Towers of Hanoi",
      "Tree traversal (in-order, pre-order, post-order)",
      "Tail recursion",
      "Memoisation",
    ],
    tips: [
      "Every recursive function NEEDS a base case — without it: infinite recursion",
      "Stack overflow occurs when recursion too deep",
      "Memoisation = caching recursive results = transforms O(2ⁿ) Fibonacci to O(n)",
      "Towers of Hanoi: minimum moves = 2ⁿ - 1 for n disks",
      "Tree traversal: in-order = left-root-right (gives sorted order for BST)",
    ],
    hasDiagram: false,
    questions: [
      {
        marks: 4,
        q: "Write a recursive function in pseudocode to compute the nth Fibonacci number. Then write a memoised version and compare the time complexity.",
        a: "// Basic recursive (inefficient)\nFUNCTION fib(n : INTEGER) : INTEGER\n  IF n <= 1 THEN RETURN n\n  RETURN fib(n-1) + fib(n-2)\nENDFUNCTION\n// Time: O(2ⁿ) — exponential\n\n// Memoised version\nDECLARE memo : ARRAY[0:100] OF INTEGER\n// Initialise memo to -1\n\nFUNCTION fibMemo(n : INTEGER) : INTEGER\n  IF n <= 1 THEN RETURN n\n  IF memo[n] <> -1 THEN RETURN memo[n]  // cache hit\n  memo[n] ← fibMemo(n-1) + fibMemo(n-2)\n  RETURN memo[n]\nENDFUNCTION\n// Time: O(n) — each value computed once\n\nComparison: fib(40) basic ≈ 2⁴⁰ ≈ 10¹² calls; memoised = 40 calls",
        explanation:
          "Memoisation = cache results. Fibonacci without memo recalculates same values billions of times.",
      },
      {
        marks: 4,
        q: "Trace the recursive call to fib(5) (basic version) and draw the call tree. Count the total number of function calls.",
        a: "Call tree for fib(5):\n            fib(5)\n          /        \\\n      fib(4)      fib(3)\n      /    \\      /    \\\n  fib(3) fib(2) fib(2) fib(1)\n  / \\    / \\    / \\\nf(2)f(1)f(1)f(0)f(1)f(0)\n/ \\\nf(1)f(0)\n\nBase cases reached: fib(0)=0, fib(1)=1\n\nTotal function calls: 15\nfib(5)=1, fib(4)=1, fib(3)=2, fib(2)=3, fib(1)=5, fib(0)=3\nTotal = 1+1+2+3+5+3 = 15 calls\n\nResult: fib(5) = 5",
        explanation:
          "The exponential growth of calls is clear in the tree. Many values recomputed multiple times.",
      },
      {
        marks: 3,
        q: "Write a recursive pseudocode function to perform an in-order traversal of a binary tree. Describe what order in-order traversal visits nodes.",
        a: "PROCEDURE inOrder(node)\n  IF node = NULL THEN RETURN  // base case\n  inOrder(node.left)           // visit left subtree\n  OUTPUT node.data             // visit current node\n  inOrder(node.right)          // visit right subtree\nENDPROCEDURE\n\nOrder: in-order traversal visits nodes in Left → Root → Right order.\nFor a Binary Search Tree (BST), in-order traversal visits all nodes in ascending sorted order.\n\nExample BST in-order: 1, 3, 4, 6, 7, 8, 10, 13, 14",
        explanation:
          "In-order: LRR (Left-Root-Right). Pre-order: Root-Left-Right. Post-order: Left-Right-Root.",
      },
      {
        marks: 3,
        q: "Explain why some recursive solutions are inefficient and how this can be addressed. Use an example.",
        a: "Problem: Recursive solutions often recompute the same subproblems multiple times.\nExample: fib(40) recursive solution makes ~2⁴⁰ ≈ 10¹² calls because fib(38) is computed independently in both fib(39) and fib(40) branches — exponential time.\n\nSolutions:\n1. Memoisation (top-down dynamic programming): cache results of each recursive call. First call computes the value; subsequent calls return cached result. fib(40) now = 40 calls.\n2. Iterative solution: convert to loop-based approach (avoids call stack entirely).\n3. Tail recursion optimisation: some compilers convert tail-recursive calls to iteration automatically.",
        explanation:
          "Overlapping subproblems cause exponential blowup. Memoisation caches results → polynomial time.",
      },
    ],
  },

  {
    id: "c25",
    part: "Part 4 – Further Problem Solving & Programming (Practical)",
    level: "A2",
    title: "Programming Paradigms",
    topics: [
      "Procedural programming",
      "Object-oriented programming (OOP)",
      "Functional programming",
      "Declarative programming",
      "Event-driven programming",
      "Low-level programming",
      "Comparison of paradigms",
    ],
    tips: [
      "OOP pillars: Encapsulation, Inheritance, Polymorphism, Abstraction",
      "Encapsulation: data + methods together; private attributes",
      "Polymorphism: same interface, different behaviour (overriding vs overloading)",
      "Functional: pure functions, no side effects, immutable data",
      "Declarative: WHAT not HOW (SQL, Prolog)",
      "Event-driven: code runs in response to events (GUI apps)",
    ],
    hasDiagram: false,
    questions: [
      {
        marks: 4,
        q: "Explain the four pillars of Object-Oriented Programming with an example for each.",
        a: "1. Encapsulation: bundling data (attributes) and methods together in a class, with private attributes protected from direct external access. Access through getters/setters.\nExample: class BankAccount with private __balance; only deposit() and withdraw() can modify it.\n\n2. Inheritance: a subclass inherits attributes and methods from a superclass, extending or overriding them.\nExample: class SavingsAccount extends BankAccount, inheriting all BankAccount methods plus adding interestRate.\n\n3. Polymorphism: objects of different classes can be used through the same interface; same method name behaves differently.\nExample: Animal.speak() returns 'Woof' for Dog, 'Meow' for Cat.\n\n4. Abstraction: hiding complex implementation details, exposing only necessary interface.\nExample: drive() method of Car — driver doesn't need to know about engine internals.",
        explanation:
          "4 pillars: EIPA. Give class-based examples. Examiner wants NAME + DEFINITION + EXAMPLE for each.",
      },
      {
        marks: 3,
        q: "Compare procedural and functional programming paradigms. State ONE scenario where each is more appropriate.",
        a: "Procedural: programs written as sequences of instructions; state stored in variables that change; uses loops, conditionals, and procedures. Program flow is explicit.\nAppropriate: general-purpose programming, system scripts, straightforward algorithms (e.g. file processing scripts).\n\nFunctional: programs written as evaluations of mathematical functions; no mutable state; pure functions (same input always gives same output, no side effects); favours recursion over loops.\nAppropriate: concurrent/parallel programming (no shared state = no race conditions); data transformation pipelines; financial calculations requiring predictability.",
        explanation:
          "Procedural=step-by-step+mutable state. Functional=pure functions+immutable data. Neither is universally better.",
      },
      {
        marks: 2,
        q: "Explain the difference between method overriding and method overloading.",
        a: "Method overriding (runtime polymorphism): a subclass provides its own implementation of a method that is already defined in its superclass. Same method name AND same signature. Called based on the actual object type at runtime.\nExample: Dog.speak() overrides Animal.speak().\n\nMethod overloading (compile-time polymorphism): multiple methods with the same name but different parameter lists (different number or types of parameters) in the same class.\nExample: add(int a, int b) and add(float a, float b) — same name, different parameter types.",
        explanation:
          "Overriding = subclass replaces parent method. Overloading = same name, different parameters (same class).",
      },
    ],
  },

  {
    id: "c26",
    part: "Part 4 – Further Problem Solving & Programming (Practical)",
    level: "A2",
    title: "File Processing & Exception Handling",
    topics: [
      "File modes: read, write, append",
      "CSV file handling",
      "Binary file handling",
      "try/except/finally",
      "Custom exception classes",
      "Validation and verification",
      "Difference: error vs exception",
    ],
    tips: [
      "Always CLOSE files — use try/finally to guarantee closure",
      "EOF check before reading in pseudocode: WHILE NOT EOF(filename)",
      "Append mode adds to end; write mode overwrites entire file",
      "Exception handling: try=risky code, except=handle error, finally=always runs",
      "Custom exceptions: class MyError(Exception): pass in Python",
    ],
    hasDiagram: false,
    questions: [
      {
        marks: 4,
        q: "Write pseudocode for a program that reads student records from 'students.csv' (format: Name,Score), calculates the average score, and writes students scoring above average to 'topStudents.txt'.",
        a: 'DECLARE name : STRING\nDECLARE score, total, count : INTEGER\nDECLARE average : REAL\nDECLARE students : ARRAY of records\n\n// Read and calculate average\ntotal ← 0\ncount ← 0\nOPEN "students.csv" FOR READ\nWHILE NOT EOF("students.csv") DO\n  READFILE("students.csv", name & "," & score)\n  total ← total + score\n  count ← count + 1\n  students[count] ← {name, score}\nENDWHILE\nCLOSE "students.csv"\n\naverage ← total / count\n\n// Write top students\nOPEN "topStudents.txt" FOR WRITE\nFOR i ← 1 TO count\n  IF students[i].score > average THEN\n    WRITEFILE("topStudents.txt", students[i].name & "," & students[i].score)\n  ENDIF\nNEXT i\nCLOSE "topStudents.txt"\n\nOUTPUT "Average: ", average',
        explanation:
          "Two file passes: first to calculate average, second to filter. Always close files. Validate count>0 before dividing.",
      },
      {
        marks: 3,
        q: "Write Python code demonstrating exception handling with multiple except clauses, a finally block, and a custom exception.",
        a: 'class InvalidScoreError(Exception):\n    """Raised when score is outside valid range"""\n    pass\n\ndef process_score(score):\n    try:\n        score = int(score)          # may raise ValueError\n        if score < 0 or score > 100:\n            raise InvalidScoreError(f"Score {score} not in range 0-100")\n        result = 100 / score        # may raise ZeroDivisionError\n        return result\n    except ValueError:\n        print("Error: Score must be an integer")\n    except ZeroDivisionError:\n        print("Error: Score cannot be zero for this calculation")\n    except InvalidScoreError as e:\n        print(f"Validation error: {e}")\n    finally:\n        print("Score processing complete")  # always runs\n\nprocess_score(\'abc\')   # ValueError\nprocess_score(150)     # InvalidScoreError\nprocess_score(0)       # ZeroDivisionError',
        explanation:
          "Custom exception inherits from Exception. Multiple except handles different error types. Finally always runs.",
      },
      {
        marks: 2,
        q: "Explain the difference between a program error and a program exception. Give an example of each.",
        a: "Error: a problem that cannot be recovered from during runtime — typically a programming mistake or resource failure.\nExample: StackOverflowError (infinite recursion) — program must terminate.\n\nException: an unexpected event during program execution that CAN be caught and handled gracefully by the program using try/except.\nExample: FileNotFoundError — file doesn't exist; program can catch it and ask user for correct filename.",
        explanation:
          "Errors = unrecoverable. Exceptions = catchable/recoverable. Exception handling makes programs robust.",
      },
    ],
  },

  {
    id: "c27",
    part: "Part 4 – Further Problem Solving & Programming (Practical)",
    level: "A2",
    title: "Object-Oriented Programming (Deep Dive)",
    topics: [
      "Classes, objects, instances",
      "Constructors and destructors",
      "Access modifiers (public, private, protected)",
      "Getter and setter methods",
      "Inheritance and method overriding",
      "Abstract classes and interfaces",
      "Polymorphism in practice",
      "UML class diagrams",
    ],
    tips: [
      "Private attributes: __ prefix in Python (e.g. self.__balance)",
      "super().__init__() calls parent constructor",
      "Abstract class: cannot be instantiated directly; forces subclasses to implement methods",
      "UML: + = public, - = private, # = protected",
      "IS-A = inheritance; HAS-A = composition",
    ],
    hasDiagram: true,
    diagramQuestions: [
      {
        q: "Draw a UML class diagram for a library system with classes: LibraryItem (abstract), Book, DVD, Member, and Loan. Show attributes, methods, access modifiers, and relationships.",
        marks: 6,
        diagramDesc: "UML class diagram with inheritance and associations",
        a: "┌──────────────────┐\n│  <<abstract>>    │\n│  LibraryItem     │\n├──────────────────┤\n│-itemID: String   │\n│-title: String    │\n│-available: Bool  │\n├──────────────────┤\n│+getTitle(): Str  │\n│+isAvailable():B  │\n│+checkout() (abs) │\n└────────┬─────────┘\n         △ (inheritance)\n    ┌────┴────┐\n    ↓         ↓\n┌──────┐  ┌──────┐\n│Book  │  │ DVD  │\n├──────┤  ├──────┤\n│-ISBN │  │-cert │\n└──────┘  └──────┘\n\nMember HAS-A Loan (1 member, many loans)\nLoan HAS-A LibraryItem (each loan = 1 item)",
        examNote:
          "Abstract class shown with <<abstract>> stereotype. Inheritance = hollow triangle arrow. HAS-A = line with multiplicity.",
      },
    ],
    questions: [
      {
        marks: 5,
        q: "Write Python code for a class hierarchy: Shape (abstract) with area() and perimeter() methods; Circle and Rectangle subclasses. Demonstrate polymorphism.",
        a: "from abc import ABC, abstractmethod\nimport math\n\nclass Shape(ABC):  # Abstract class\n    def __init__(self, colour):\n        self.__colour = colour  # private\n    \n    def get_colour(self):\n        return self.__colour\n    \n    @abstractmethod\n    def area(self):  # must be overridden\n        pass\n    \n    @abstractmethod\n    def perimeter(self):\n        pass\n    \n    def describe(self):\n        return f\"{self.__colour} shape: area={self.area():.2f}\"\n\nclass Circle(Shape):\n    def __init__(self, colour, radius):\n        super().__init__(colour)\n        self.__radius = radius\n    \n    def area(self):\n        return math.pi * self.__radius ** 2\n    \n    def perimeter(self):\n        return 2 * math.pi * self.__radius\n\nclass Rectangle(Shape):\n    def __init__(self, colour, width, height):\n        super().__init__(colour)\n        self.__width = width\n        self.__height = height\n    \n    def area(self):\n        return self.__width * self.__height\n    \n    def perimeter(self):\n        return 2 * (self.__width + self.__height)\n\n# Polymorphism:\nshapes = [Circle('red', 5), Rectangle('blue', 4, 6)]\nfor s in shapes:\n    print(s.describe())  # same method, different behaviour",
        explanation:
          "ABC + @abstractmethod enforces abstract class. super().__init__() chains constructors. Polymorphism via list of mixed shapes.",
      },
      {
        marks: 3,
        q: "Explain encapsulation and why it is important. Show an example where a lack of encapsulation causes a problem.",
        a: "Encapsulation: the bundling of data (attributes) and methods that operate on that data within a single class unit, with internal data protected from direct outside access using access modifiers.\n\nImportance: prevents invalid state; controls how data is modified; reduces coupling between classes; makes code easier to maintain.\n\nProblem without encapsulation:\nclass BankAccount:\n    balance = 1000  # public\n\naccount.balance = -50000  # direct access! Invalid!\n\nWith encapsulation:\nclass BankAccount:\n    def __init__(self):\n        self.__balance = 1000  # private\n    def withdraw(self, amount):\n        if amount > self.__balance:\n            raise Exception('Insufficient funds')\n        self.__balance -= amount  # validated",
        explanation:
          "Private attributes + public methods = controlled access. Without it, any code can set balance to any value.",
      },
    ],
  },

  {
    id: "c28",
    part: "Part 4 – Further Problem Solving & Programming (Practical)",
    level: "A2",
    title: "Low-Level Programming",
    topics: [
      "Assembly language for Paper 4",
      "Addressing modes in practice",
      "Stack operations: PUSH, POP",
      "Subroutines: CALL, RET",
      "Bit manipulation: AND, OR, XOR masks",
      "Interrupts and ISR implementation",
      "Comparing high-level vs low-level",
    ],
    tips: [
      "AND mask: clears specific bits (0 in mask clears that bit)",
      "OR mask: sets specific bits (1 in mask sets that bit)",
      "XOR mask: toggles specific bits (1 in mask flips that bit)",
      "CALL saves return address to stack; RET pops and jumps",
      "Assembly is faster but harder to maintain than high-level code",
      "Bit masking used for: flags, permissions, hardware registers",
    ],
    hasDiagram: false,
    questions: [
      {
        marks: 3,
        q: "Explain how AND, OR, and XOR operations can be used as bit masks. Give a practical example of each.",
        a: "AND mask (clear bits): ANDing with 0 clears a bit; ANDing with 1 preserves it.\nExample: Isolate lower 4 bits of register: 10110101 AND 00001111 = 00000101\n\nOR mask (set bits): ORing with 1 sets a bit; ORing with 0 preserves it.\nExample: Set bit 3 (0-indexed): 10110001 OR 00001000 = 10111001\n\nXOR mask (toggle bits): XORing with 1 flips a bit; XORing with 0 preserves it.\nExample: Toggle bits 5 and 7: 10110101 XOR 10100000 = 00010101\nDouble-XOR restores original (used in simple encryption).",
        explanation:
          "AND=clear, OR=set, XOR=toggle. Masks are essential for hardware programming and flag manipulation.",
      },
      {
        marks: 4,
        q: "Write assembly code using CALL and RET to implement a subroutine that multiplies the value in ACC by 3, then call it twice from the main program.",
        a: "; Main program\nLDD #5       ; ACC = 5\nCALL triple  ; Call subroutine, ACC = 15\nSTO result1  ; Store 15\nLDD #4       ; ACC = 4\nCALL triple  ; Call subroutine, ACC = 12\nSTO result2  ; Store 12\nHALT\n\n; Subroutine: multiplies ACC by 3\ntriple:\nSTO temp     ; Save original value\nADD temp     ; ACC = original*2\nADD temp     ; ACC = original*3\nRET          ; Return to caller\n\ntemp: 0\nresult1: 0\nresult2: 0\n\n; CALL pushes next PC to stack; RET pops PC from stack",
        explanation:
          "CALL saves return address. Must save ACC before modifying. RET returns control to instruction after CALL.",
      },
      {
        marks: 3,
        q: "Compare high-level and low-level programming languages. Give advantages and disadvantages of each.",
        a: "High-level languages (Python, Java, C++):\n+ Easier to write, read, and maintain\n+ Portable across different hardware\n+ Rich libraries and abstractions\n+ Faster development time\n- Slower execution (requires interpretation/compilation)\n- Less control over hardware\n\nLow-level languages (Assembly, Machine code):\n+ Fastest execution — direct hardware control\n+ Minimal memory usage\n+ Direct access to registers, I/O ports, interrupts\n- Very difficult to write and debug\n- Hardware-specific, not portable\n- Longer development time\n\nUse case: embedded systems and device drivers use low-level for performance; general applications use high-level.",
        explanation:
          "Low-level = fast + control, hard to write. High-level = easy + portable, some performance cost.",
      },
    ],
  },

  {
    id: "c29",
    part: "Part 4 – Further Problem Solving & Programming (Practical)",
    level: "A2",
    title: "Declarative Programming (Prolog)",
    topics: [
      "Prolog facts, rules, and queries",
      "Unification and pattern matching",
      "Backtracking",
      "List processing in Prolog",
      "Recursion in Prolog",
      "Differences from procedural programming",
    ],
    tips: [
      "Fact: parent(tom, bob). (ends with full stop)",
      "Rule: grandparent(X,Z) :- parent(X,Y), parent(Y,Z).",
      "Query: ?- grandparent(tom, Who).",
      "Variables start with uppercase; atoms/constants lowercase",
      "Prolog tries ALL possible solutions via backtracking",
      "is/2 for arithmetic: X is 3 + 4.",
    ],
    hasDiagram: false,
    questions: [
      {
        marks: 4,
        q: "Given the following Prolog facts:\nparent(tom, bob).\nparent(tom, liz).\nparent(bob, ann).\nparent(bob, pat).\n\nWrite a Prolog rule for 'grandparent' and show the result of the query: ?- grandparent(tom, Who).",
        a: "Rule:\ngrandparent(X, Z) :- parent(X, Y), parent(Y, Z).\n\nQuery: ?- grandparent(tom, Who).\n\nProlog execution (backtracking):\n1. Try parent(tom, Y) → Y = bob ✓\n   Try parent(bob, Z) → Z = ann → Who = ann ✓ (first solution)\n2. Backtrack: Try parent(bob, Z) → Z = pat → Who = pat ✓\n3. Backtrack: Try parent(tom, Y) → Y = liz ✓\n   Try parent(liz, Z) → No facts → fail\n4. No more solutions.\n\nResults:\nWho = ann ;\nWho = pat ;\nfalse.",
        explanation:
          "Backtracking = Prolog tries all possibilities. Semicolon in query asks for next solution.",
      },
      {
        marks: 3,
        q: "Write Prolog rules to: (1) define a list length predicate, and (2) check if an element is a member of a list.",
        a: "% Length of a list\nlength_list([], 0).                    % base case: empty list\nlength_list([_|T], N) :-               % recursive case\n    length_list(T, N1),\n    N is N1 + 1.\n\n% Membership test\nmember_of(X, [X|_]).                   % X is head of list\nmember_of(X, [_|T]) :-                 % X is in tail\n    member_of(X, T).\n\n% Example queries:\n% ?- length_list([a,b,c], N). → N = 3\n% ?- member_of(b, [a,b,c]). → true\n% ?- member_of(d, [a,b,c]). → false",
        explanation:
          "[H|T] = head-tail list pattern. Recursion base case = empty list. Prolog built-in: length/2, member/2.",
      },
      {
        marks: 3,
        q: "Explain how Prolog's backtracking works. Describe a situation where backtracking would fail.",
        a: "Backtracking: when Prolog reaches a dead end (a goal fails), it undoes the last choice made and tries the next alternative. This continues until either a solution is found or all alternatives are exhausted.\n\nProcess:\n1. Prolog tries to match a goal against available facts/rules\n2. If match found, continues with remaining goals\n3. If later goal fails, Prolog backtracks to last choice point\n4. Tries next matching fact/rule\n5. If no more alternatives: overall query fails\n\nBacktracking fails completely: if a query has no solution in the knowledge base.\nExample: ?- parent(ann, X). → false if ann has no children listed as facts.\nProlog does NOT generate new facts — it only searches existing ones.",
        explanation:
          "Prolog = search + backtrack. It cannot invent facts. Closed-world assumption: if not stated, assumed false.",
      },
      {
        marks: 2,
        q: "State TWO differences between Prolog (declarative) and Python (procedural/OOP) as programming languages.",
        a: "1. In Prolog, you define WHAT the relationships/facts are, and Prolog figures out HOW to find solutions. In Python, you explicitly code HOW to solve the problem step by step.\n\n2. Prolog uses unification and pattern matching to solve queries; Python uses sequential execution, loops, and conditionals.\n\n3. Prolog has built-in backtracking (tries all possibilities); Python requires explicit loops/recursion for the same effect.\n\n4. Prolog programs consist of facts and rules in a knowledge base; Python programs consist of instructions and functions.",
        explanation:
          "Declarative = WHAT (specify logic). Procedural = HOW (specify steps). Fundamental paradigm difference.",
      },
    ],
  },
];

// ─── SMALL ICON COMPONENT ────────────────────────────────────────────────────
const Ico = ({ d, size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {d.split("|").map((p, i) => (
      <path key={i} d={p} />
    ))}
  </svg>
);

// ─── AI EXAMINER ─────────────────────────────────────────────────────────────
function AIExaminer({ chapter }) {
  const [state, setState] = useState("idle");
  const [qData, setQData] = useState(null);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [session, setSession] = useState({ done: 0, earned: 0, total: 0 });
  const [qNum, setQNum] = useState(0);

  const generate = async () => {
    setState("loading");
    setAnswer("");
    setFeedback(null);
    try {
      const r = await fetch("/api/anthropic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [
            {
              role: "user",
              content: `You are a Cambridge 9618 A/AS Level Computer Science examiner from Pakistan.
Chapter: "${chapter.title}"
Topics: ${chapter.topics.join(", ")}

Generate ONE exam-style question. Vary the style each time:
- Mix: define, explain, state differences, calculate, trace code, write pseudocode, describe a scenario
- Include mark allocation [X marks] — use 2, 3, 4, or 6 marks only
- Make it genuinely challenging but fair for A Level standard
- For pseudocode questions, specify CAIE syntax

Respond ONLY in valid JSON (no markdown, no backticks):
{"question":"...","marks":4,"hint":"brief hint","modelAnswer":"full mark-scheme style answer","examTip":"one exam tip","questionType":"define|explain|calculate|trace|pseudocode|compare|describe"}`,
            },
          ],
        }),
      });
      const d = await r.json();
      const txt = d.content
        .map((b) => b.text || "")
        .join("")
        .replace(/```json|```/g, "")
        .trim();
      setQData(JSON.parse(txt));
      setQNum((n) => n + 1);
      setState("question");
    } catch {
      setState("idle");
    }
  };

  const submit = async () => {
    if (!answer.trim()) return;
    setState("marking");
    try {
      const r = await fetch("/api/anthropic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 800,
          messages: [
            {
              role: "user",
              content: `CAIE examiner marking a student answer.
Question: ${qData.question}
Max marks: ${qData.marks}
Mark scheme: ${qData.modelAnswer}
Student answer: ${answer}

Award marks fairly using CAIE marking principles (credit equivalent alternatives, award marks for correct points even if phrasing differs).

JSON only (no markdown):
{"awarded":2,"max":${qData.marks},"grade":"Excellent|Good|Partial|Needs Work","feedback":"2-3 sentences of examiner feedback","wellDone":"specific thing done well or empty string","improve":["point missed 1","point missed 2"]}`,
            },
          ],
        }),
      });
      const d = await r.json();
      const txt = d.content
        .map((b) => b.text || "")
        .join("")
        .replace(/```json|```/g, "")
        .trim();
      const fb = JSON.parse(txt);
      setFeedback(fb);
      setSession((s) => ({
        done: s.done + 1,
        earned: s.earned + fb.awarded,
        total: s.total + fb.max,
      }));
      setState("feedback");
    } catch {
      setState("question");
    }
  };

  const gradeColor = (g) =>
    ({
      Excellent: "#4ade80",
      Good: "#86efac",
      Partial: "#fbbf24",
      "Needs Work": "#f87171",
    }[g] || "#94a3b8");

  return (
    <div
      style={{
        background: "rgba(0,0,0,0.3)",
        border: "1px solid rgba(139,92,246,0.3)",
        borderRadius: 16,
        padding: 24,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <h3
          style={{
            margin: 0,
            color: "#a78bfa",
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: 15,
          }}
        >
          ⚡ AI Examiner
        </h3>
        {session.done > 0 && (
          <div
            style={{
              display: "flex",
              gap: 12,
              fontSize: 13,
              fontFamily: "monospace",
            }}
          >
            <span style={{ color: "#64748b" }}>{session.done} questions</span>
            <span
              style={{
                color:
                  session.earned / session.total > 0.7 ? "#4ade80" : "#fbbf24",
              }}
            >
              {session.earned}/{session.total} marks
            </span>
          </div>
        )}
      </div>

      {state === "idle" && (
        <div style={{ textAlign: "center", padding: "24px 0" }}>
          <p style={{ color: "#475569", marginBottom: 20, fontSize: 14 }}>
            AI generates unique exam-standard questions & marks your answers
            using CAIE marking criteria
          </p>
          <button onClick={generate} style={btnStyle("#7c3aed", "#a855f7")}>
            Generate Question →
          </button>
        </div>
      )}

      {state === "loading" && (
        <div
          style={{
            textAlign: "center",
            padding: 32,
            color: "#7c3aed",
            fontFamily: "monospace",
          }}
        >
          Generating question...
        </div>
      )}
      {state === "marking" && (
        <div
          style={{
            textAlign: "center",
            padding: 32,
            color: "#7c3aed",
            fontFamily: "monospace",
          }}
        >
          Marking your answer...
        </div>
      )}

      {state === "question" && qData && (
        <div>
          <div
            style={{
              background: "rgba(124,58,237,0.12)",
              border: "1px solid rgba(124,58,237,0.25)",
              borderRadius: 12,
              padding: 16,
              marginBottom: 16,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <span
                style={{
                  color: "#6d28d9",
                  fontSize: 11,
                  fontFamily: "monospace",
                }}
              >
                Q{qNum} · {qData.questionType?.toUpperCase()}
              </span>
              <span
                style={{
                  color: "#fbbf24",
                  fontSize: 12,
                  fontFamily: "monospace",
                }}
              >
                [{qData.marks} marks]
              </span>
            </div>
            <p
              style={{
                margin: 0,
                color: "#e2e8f0",
                lineHeight: 1.75,
                fontSize: 14,
              }}
            >
              {qData.question}
            </p>
          </div>
          {qData.hint && (
            <p
              style={{
                color: "#475569",
                fontSize: 12,
                marginBottom: 12,
                fontStyle: "italic",
              }}
            >
              💡 {qData.hint}
            </p>
          )}
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Write your answer here. For pseudocode, use CAIE conventions: DECLARE, INPUT, OUTPUT, IF/THEN/ENDIF, WHILE/DO/ENDWHILE, FOR/TO/NEXT, FUNCTION/ENDFUNCTION..."
            style={{
              width: "100%",
              minHeight: 130,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 10,
              padding: 14,
              color: "#e2e8f0",
              fontSize: 13,
              resize: "vertical",
              outline: "none",
              fontFamily: "'JetBrains Mono',monospace",
              lineHeight: 1.6,
              boxSizing: "border-box",
            }}
          />
          <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
            <button
              onClick={submit}
              disabled={!answer.trim()}
              style={btnStyle(
                answer.trim() ? "#15803d" : "#1e293b",
                answer.trim() ? "#16a34a" : "#334155"
              )}
            >
              Submit for Marking
            </button>
            <button
              onClick={generate}
              style={{
                ...btnStyle("#1e293b", "#334155"),
                flex: "none",
                padding: "10px 16px",
              }}
            >
              Skip
            </button>
          </div>
        </div>
      )}

      {state === "feedback" && feedback && qData && (
        <div>
          <div
            style={{
              background:
                feedback.awarded / feedback.max > 0.8
                  ? "rgba(74,222,128,0.08)"
                  : feedback.awarded / feedback.max > 0.5
                  ? "rgba(251,191,36,0.08)"
                  : "rgba(239,68,68,0.08)",
              border: `1px solid rgba(${
                feedback.awarded / feedback.max > 0.8
                  ? "74,222,128"
                  : feedback.awarded / feedback.max > 0.5
                  ? "251,191,36"
                  : "239,68,68"
              },0.3)`,
              borderRadius: 12,
              padding: 16,
              marginBottom: 14,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <span
                style={{
                  color: gradeColor(feedback.grade),
                  fontFamily: "monospace",
                  fontSize: 16,
                  fontWeight: 700,
                }}
              >
                {feedback.awarded}/{feedback.max} — {feedback.grade}
              </span>
              <span style={{ fontSize: 20 }}>
                {feedback.awarded === feedback.max
                  ? "🌟"
                  : feedback.awarded / feedback.max > 0.7
                  ? "✅"
                  : "📝"}
              </span>
            </div>
            <p
              style={{
                margin: 0,
                color: "#cbd5e1",
                lineHeight: 1.7,
                fontSize: 14,
              }}
            >
              {feedback.feedback}
            </p>
          </div>
          {feedback.wellDone && (
            <p style={{ color: "#4ade80", fontSize: 13, margin: "0 0 8px" }}>
              ✓ {feedback.wellDone}
            </p>
          )}
          {feedback.improve?.length > 0 && (
            <div style={{ marginBottom: 14 }}>
              {feedback.improve.filter(Boolean).map((p, i) => (
                <p
                  key={i}
                  style={{
                    color: "#94a3b8",
                    fontSize: 13,
                    margin: "2px 0 2px 0",
                  }}
                >
                  ✗ {p}
                </p>
              ))}
            </div>
          )}
          <details style={{ marginBottom: 14 }}>
            <summary
              style={{
                color: "#6d28d9",
                fontSize: 13,
                cursor: "pointer",
                fontFamily: "monospace",
                padding: "8px 0",
              }}
            >
              ▶ Show Model Answer
            </summary>
            <div
              style={{
                background: "rgba(255,255,255,0.03)",
                borderRadius: 10,
                padding: 14,
                marginTop: 8,
              }}
            >
              <p
                style={{
                  color: "#94a3b8",
                  fontSize: 13,
                  margin: 0,
                  lineHeight: 1.7,
                  whiteSpace: "pre-wrap",
                }}
              >
                {qData.modelAnswer}
              </p>
            </div>
          </details>
          {qData.examTip && (
            <div
              style={{
                background: "rgba(251,191,36,0.06)",
                border: "1px solid rgba(251,191,36,0.2)",
                borderRadius: 10,
                padding: 12,
                marginBottom: 14,
              }}
            >
              <p style={{ color: "#fbbf24", margin: 0, fontSize: 13 }}>
                💡 {qData.examTip}
              </p>
            </div>
          )}
          <button onClick={generate} style={btnStyle("#7c3aed", "#a855f7")}>
            Next Question →
          </button>
        </div>
      )}
    </div>
  );
}

// ─── CHAPTER DETAIL ──────────────────────────────────────────────────────────
function ChapterDetail({ ch, onBack }) {
  const [tab, setTab] = useState("notes");
  const [revealedIdx, setRevealedIdx] = useState({});

  const tabs = [
    { id: "notes", label: "📖 Notes & Tips" },
    ...(ch.hasDiagram ? [{ id: "diagrams", label: "📐 Diagram Qs" }] : []),
    { id: "2marks", label: "✦ 2-Mark Qs" },
    { id: "3marks", label: "✦✦ 3-Mark Qs" },
    { id: "4marks", label: "✦✦✦ 4-Mark Qs" },
    { id: "long", label: "✦✦✦✦ 5-6 Mark Qs" },
    { id: "ai", label: "⚡ AI Examiner" },
  ];

  const qByMark = (n) => ch.questions.filter((q) => q.marks === n);
  const longQs = ch.questions.filter((q) => q.marks >= 5);

  const toggle = (key) => setRevealedIdx((p) => ({ ...p, [key]: !p[key] }));

  const QCard = ({ q, idx, prefix }) => {
    const key = `${prefix}-${idx}`;
    return (
      <div
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 14,
          padding: 18,
          marginBottom: 14,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 8,
          }}
        >
          <span
            style={{ color: "#6d28d9", fontSize: 11, fontFamily: "monospace" }}
          >
            Q{idx + 1}
          </span>
          <span
            style={{ color: "#fbbf24", fontSize: 12, fontFamily: "monospace" }}
          >
            [{q.marks} mark{q.marks > 1 ? "s" : ""}]
          </span>
        </div>
        <p
          style={{
            color: "#e2e8f0",
            margin: "0 0 14px",
            lineHeight: 1.75,
            fontSize: 14,
            whiteSpace: "pre-wrap",
          }}
        >
          {q.q}
        </p>
        {!revealedIdx[key] ? (
          <button
            onClick={() => toggle(key)}
            style={{
              background: "rgba(109,40,217,0.15)",
              border: "1px solid rgba(109,40,217,0.35)",
              borderRadius: 8,
              padding: "7px 14px",
              color: "#a78bfa",
              cursor: "pointer",
              fontSize: 12,
              fontFamily: "monospace",
            }}
          >
            Reveal Answer
          </button>
        ) : (
          <div>
            <div
              style={{
                background: "rgba(74,222,128,0.06)",
                border: "1px solid rgba(74,222,128,0.2)",
                borderRadius: 10,
                padding: 14,
                marginBottom: 10,
              }}
            >
              <p
                style={{
                  color: "#4ade80",
                  margin: "0 0 6px",
                  fontSize: 11,
                  fontFamily: "monospace",
                }}
              >
                MODEL ANSWER
              </p>
              <p
                style={{
                  color: "#e2e8f0",
                  margin: 0,
                  whiteSpace: "pre-wrap",
                  lineHeight: 1.75,
                  fontSize: 14,
                }}
              >
                {q.a}
              </p>
            </div>
            <p
              style={{
                color: "#475569",
                fontSize: 12,
                margin: 0,
                lineHeight: 1.6,
                fontStyle: "italic",
              }}
            >
              📌 {q.explanation}
            </p>
            <button
              onClick={() => toggle(key)}
              style={{
                background: "none",
                border: "none",
                color: "#475569",
                cursor: "pointer",
                fontSize: 11,
                marginTop: 8,
                fontFamily: "monospace",
              }}
            >
              Hide answer
            </button>
          </div>
        )}
      </div>
    );
  };

  const DQCard = ({ q, idx }) => {
    const key = `d-${idx}`;
    return (
      <div
        style={{
          background: "rgba(251,191,36,0.04)",
          border: "1px solid rgba(251,191,36,0.15)",
          borderRadius: 14,
          padding: 18,
          marginBottom: 14,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 10,
          }}
        >
          <span
            style={{
              color: "#fbbf24",
              fontSize: 11,
              fontFamily: "monospace",
              background: "rgba(251,191,36,0.1)",
              padding: "2px 8px",
              borderRadius: 20,
            }}
          >
            DIAGRAM Q
          </span>
          <span
            style={{ color: "#fbbf24", fontSize: 12, fontFamily: "monospace" }}
          >
            [{q.marks} marks]
          </span>
        </div>
        <p
          style={{
            color: "#e2e8f0",
            margin: "0 0 10px",
            lineHeight: 1.75,
            fontSize: 14,
          }}
        >
          {q.q}
        </p>
        <div
          style={{
            background: "rgba(251,191,36,0.08)",
            border: "1px dashed rgba(251,191,36,0.3)",
            borderRadius: 10,
            padding: 12,
            marginBottom: 12,
          }}
        >
          <p
            style={{
              color: "#fbbf24",
              fontSize: 11,
              fontFamily: "monospace",
              margin: "0 0 4px",
            }}
          >
            DIAGRAM DESCRIPTION
          </p>
          <p
            style={{
              color: "#94a3b8",
              fontSize: 13,
              margin: 0,
              fontStyle: "italic",
            }}
          >
            {q.diagramDesc}
          </p>
        </div>
        {!revealedIdx[key] ? (
          <button
            onClick={() => toggle(key)}
            style={{
              background: "rgba(251,191,36,0.1)",
              border: "1px solid rgba(251,191,36,0.3)",
              borderRadius: 8,
              padding: "7px 14px",
              color: "#fbbf24",
              cursor: "pointer",
              fontSize: 12,
              fontFamily: "monospace",
            }}
          >
            Show Model Answer
          </button>
        ) : (
          <div>
            <div
              style={{
                background: "rgba(74,222,128,0.06)",
                border: "1px solid rgba(74,222,128,0.2)",
                borderRadius: 10,
                padding: 14,
                marginBottom: 10,
              }}
            >
              <p
                style={{
                  color: "#4ade80",
                  fontSize: 11,
                  fontFamily: "monospace",
                  margin: "0 0 6px",
                }}
              >
                MODEL ANSWER
              </p>
              <p
                style={{
                  color: "#e2e8f0",
                  margin: 0,
                  whiteSpace: "pre-wrap",
                  lineHeight: 1.75,
                  fontSize: 13,
                }}
              >
                {q.a}
              </p>
            </div>
            {q.examNote && (
              <div
                style={{
                  background: "rgba(251,191,36,0.06)",
                  borderRadius: 10,
                  padding: 12,
                }}
              >
                <p style={{ color: "#fbbf24", margin: 0, fontSize: 13 }}>
                  ⚠️ Examiner note: {q.examNote}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <button
        onClick={onBack}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 8,
          padding: "7px 14px",
          color: "#64748b",
          cursor: "pointer",
          marginBottom: 20,
          fontSize: 12,
          fontFamily: "monospace",
        }}
      >
        ← All Chapters
      </button>

      <div
        style={{
          background:
            "linear-gradient(135deg,rgba(109,40,217,0.2),rgba(168,85,247,0.08))",
          border: "1px solid rgba(109,40,217,0.3)",
          borderRadius: 16,
          padding: "20px 24px",
          marginBottom: 24,
        }}
      >
        <div
          style={{
            fontSize: 11,
            color: "#7c3aed",
            fontFamily: "monospace",
            marginBottom: 6,
          }}
        >
          {ch.part} · {ch.level}
        </div>
        <h2
          style={{
            margin: "0 0 6px",
            color: "#f1f5f9",
            fontSize: 22,
            fontWeight: 800,
          }}
        >
          {ch.title}
        </h2>
        <div
          style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 }}
        >
          {ch.topics.map((t, i) => (
            <span
              key={i}
              style={{
                background: "rgba(109,40,217,0.15)",
                color: "#a78bfa",
                fontSize: 11,
                padding: "3px 10px",
                borderRadius: 20,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Question count summary */}
      <div
        style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}
      >
        {[2, 3, 4].map((m) => {
          const c = qByMark(m).length;
          return c > 0 ? (
            <span
              key={m}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 20,
                padding: "4px 12px",
                fontSize: 12,
                color: "#94a3b8",
                fontFamily: "monospace",
              }}
            >
              {c}× {m}-mark
            </span>
          ) : null;
        })}
        {longQs.length > 0 && (
          <span
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 20,
              padding: "4px 12px",
              fontSize: 12,
              color: "#94a3b8",
              fontFamily: "monospace",
            }}
          >
            {longQs.length}× 5-6 mark
          </span>
        )}
        {ch.hasDiagram && (
          <span
            style={{
              background: "rgba(251,191,36,0.08)",
              border: "1px solid rgba(251,191,36,0.2)",
              borderRadius: 20,
              padding: "4px 12px",
              fontSize: 12,
              color: "#fbbf24",
              fontFamily: "monospace",
            }}
          >
            {ch.diagramQuestions?.length}× diagram
          </span>
        )}
        <span
          style={{
            background: "rgba(139,92,246,0.1)",
            border: "1px solid rgba(139,92,246,0.2)",
            borderRadius: 20,
            padding: "4px 12px",
            fontSize: 12,
            color: "#a78bfa",
            fontFamily: "monospace",
          }}
        >
          + unlimited AI questions
        </span>
      </div>

      {/* Tab bar */}
      <div
        style={{
          display: "flex",
          gap: 6,
          flexWrap: "wrap",
          marginBottom: 24,
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          paddingBottom: 12,
        }}
      >
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              background: tab === t.id ? "rgba(109,40,217,0.25)" : "none",
              border:
                tab === t.id
                  ? "1px solid rgba(109,40,217,0.5)"
                  : "1px solid transparent",
              borderRadius: 8,
              padding: "7px 14px",
              color: tab === t.id ? "#a78bfa" : "#475569",
              cursor: "pointer",
              fontSize: 12,
              fontFamily: "monospace",
              transition: "all .2s",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* NOTES */}
      {tab === "notes" && (
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 16,
              padding: 20,
            }}
          >
            <h4
              style={{
                margin: "0 0 16px",
                color: "#a78bfa",
                fontFamily: "monospace",
                fontSize: 13,
              }}
            >
              KEY TOPICS
            </h4>
            {ch.topics.map((t, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 10,
                  padding: "8px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                }}
              >
                <span style={{ color: "#6d28d9" }}>◆</span>
                <span style={{ color: "#cbd5e1", fontSize: 14 }}>{t}</span>
              </div>
            ))}
          </div>
          <div
            style={{
              background: "rgba(251,191,36,0.04)",
              border: "1px solid rgba(251,191,36,0.15)",
              borderRadius: 16,
              padding: 20,
            }}
          >
            <h4
              style={{
                margin: "0 0 16px",
                color: "#fbbf24",
                fontFamily: "monospace",
                fontSize: 13,
              }}
            >
              EXAM TIPS
            </h4>
            {ch.tips.map((t, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 10,
                  padding: "8px 0",
                  borderBottom: "1px solid rgba(251,191,36,0.06)",
                }}
              >
                <span style={{ color: "#fbbf24", flexShrink: 0 }}>→</span>
                <span
                  style={{ color: "#e2e8f0", fontSize: 13, lineHeight: 1.6 }}
                >
                  {t}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DIAGRAM Qs */}
      {tab === "diagrams" && ch.hasDiagram && (
        <div>
          <p style={{ color: "#64748b", fontSize: 13, marginBottom: 20 }}>
            These questions require you to draw or interpret diagrams. Sketch
            your diagram, then reveal the model answer to compare.
          </p>
          {ch.diagramQuestions?.map((q, i) => (
            <DQCard key={i} q={q} idx={i} />
          ))}
        </div>
      )}

      {/* 2-MARK Qs */}
      {tab === "2marks" && (
        <div>
          {qByMark(2).length === 0 ? (
            <p style={{ color: "#475569", textAlign: "center", padding: 32 }}>
              No 2-mark questions for this chapter.
            </p>
          ) : (
            qByMark(2).map((q, i) => <QCard key={i} q={q} idx={i} prefix="2" />)
          )}
        </div>
      )}

      {/* 3-MARK Qs */}
      {tab === "3marks" && (
        <div>
          {qByMark(3).length === 0 ? (
            <p style={{ color: "#475569", textAlign: "center", padding: 32 }}>
              No 3-mark questions for this chapter.
            </p>
          ) : (
            qByMark(3).map((q, i) => <QCard key={i} q={q} idx={i} prefix="3" />)
          )}
        </div>
      )}

      {/* 4-MARK Qs */}
      {tab === "4marks" && (
        <div>
          {qByMark(4).length === 0 ? (
            <p style={{ color: "#475569", textAlign: "center", padding: 32 }}>
              No 4-mark questions for this chapter.
            </p>
          ) : (
            qByMark(4).map((q, i) => <QCard key={i} q={q} idx={i} prefix="4" />)
          )}
        </div>
      )}

      {/* 5-6 MARK Qs */}
      {tab === "long" && (
        <div>
          {longQs.length === 0 ? (
            <p style={{ color: "#475569", textAlign: "center", padding: 32 }}>
              No 5-6 mark questions for this chapter — use AI Examiner for
              these.
            </p>
          ) : (
            longQs.map((q, i) => <QCard key={i} q={q} idx={i} prefix="long" />)
          )}
        </div>
      )}

      {/* AI EXAMINER */}
      {tab === "ai" && <AIExaminer chapter={ch} />}
    </div>
  );
}

// ─── CHAPTER LIST VIEW ────────────────────────────────────────────────────────
function ChapterList({ onSelect, progress, onToggle }) {
  const parts = [...new Set(CHAPTERS.map((c) => c.part))];
  return (
    <div>
      <h2
        style={{
          margin: "0 0 4px",
          color: "#f1f5f9",
          fontSize: 24,
          fontWeight: 800,
        }}
      >
        All Chapters
      </h2>
      <p style={{ color: "#475569", marginBottom: 32, fontSize: 14 }}>
        {CHAPTERS.filter((c) => progress[c.id]).length}/{CHAPTERS.length}{" "}
        completed
      </p>
      {parts.map((part) => (
        <div key={part} style={{ marginBottom: 32 }}>
          <div
            style={{
              background: "rgba(109,40,217,0.12)",
              border: "1px solid rgba(109,40,217,0.2)",
              borderRadius: 10,
              padding: "10px 16px",
              marginBottom: 14,
            }}
          >
            <span
              style={{
                color: "#a78bfa",
                fontFamily: "monospace",
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              {part}
            </span>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
              gap: 12,
            }}
          >
            {CHAPTERS.filter((c) => c.part === part).map((ch) => (
              <div
                key={ch.id}
                onClick={() => onSelect(ch)}
                style={{
                  background: progress[ch.id]
                    ? "rgba(74,222,128,0.05)"
                    : "rgba(255,255,255,0.02)",
                  border: `1px solid ${
                    progress[ch.id]
                      ? "rgba(74,222,128,0.25)"
                      : "rgba(255,255,255,0.07)"
                  }`,
                  borderRadius: 14,
                  padding: 16,
                  cursor: "pointer",
                  transition: "all .2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(109,40,217,0.5)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = progress[ch.id]
                    ? "rgba(74,222,128,0.25)"
                    : "rgba(255,255,255,0.07)")
                }
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 8,
                  }}
                >
                  <span
                    style={{
                      color: "#6d28d9",
                      fontSize: 10,
                      fontFamily: "monospace",
                    }}
                  >
                    {ch.id.toUpperCase()}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggle(ch.id);
                    }}
                    style={{
                      background: progress[ch.id]
                        ? "rgba(74,222,128,0.15)"
                        : "rgba(255,255,255,0.05)",
                      border: "none",
                      borderRadius: 20,
                      padding: "2px 10px",
                      color: progress[ch.id] ? "#4ade80" : "#475569",
                      cursor: "pointer",
                      fontSize: 10,
                      fontFamily: "monospace",
                    }}
                  >
                    {progress[ch.id] ? "✓ Done" : "Mark done"}
                  </button>
                </div>
                <h4
                  style={{
                    margin: "0 0 8px",
                    color: "#e2e8f0",
                    fontSize: 14,
                    lineHeight: 1.4,
                  }}
                >
                  {ch.title}
                </h4>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  <span style={{ color: "#475569", fontSize: 11 }}>
                    {ch.questions.length} Qs
                  </span>
                  {ch.hasDiagram && (
                    <span style={{ color: "#fbbf24", fontSize: 11 }}>
                      · diagrams
                    </span>
                  )}
                  <span style={{ color: "#6d28d9", fontSize: 11 }}>· AI</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── TIPS PAGE ────────────────────────────────────────────────────────────────
function TipsPage() {
  const sections = [
    {
      title: "Paper 1 & 3 — Theory",
      col: "#4ade80",
      items: [
        "Command word 'Define': use 'the process/ability/method by which...' structure",
        "Command word 'State': one clear fact per mark — no explanations needed",
        "Command word 'Explain': reason + effect, or definition + development",
        "Command word 'Compare': must mention BOTH items, use comparative language",
        "Binary/hex calculations: always show working — partial marks awarded",
        "For 6-mark questions: write 6 clearly separate, distinct points",
        "Diagrams: label everything — unlabelled components score 0",
        "Network questions: draw diagram if not given one",
      ],
    },
    {
      title: "Paper 2 — Pseudocode Rules",
      col: "#f472b6",
      items: [
        "DECLARE varName : DATATYPE before using any variable",
        "Array: DECLARE arr : ARRAY[1:10] OF INTEGER",
        "FOR loop: FOR i ← 1 TO n ... NEXT i",
        "WHILE loop: WHILE condition DO ... ENDWHILE",
        "Function: FUNCTION name(param : TYPE) : RETURNTYPE ... RETURN val ... ENDFUNCTION",
        "Procedure: PROCEDURE name(BYREF/BYVAL param : TYPE) ... ENDPROCEDURE",
        "String concat: use & operator (e.g. firstName & ' ' & lastName)",
        "Integer divide: DIV. Remainder: MOD",
      ],
    },
    {
      title: "Paper 4 — Practical Tips",
      col: "#fbbf24",
      items: [
        "Include docstrings/comments — examiners award marks for documentation",
        "Test your code mentally: trace through before submitting",
        "OOP: constructor, getters/setters, ≥1 working method, inheritance",
        "Show test evidence: test plan with expected vs actual results",
        "File handling: ALWAYS close files — use try/finally",
        "Recursion: base case MUST be shown and commented",
        "Variable names must be meaningful (not just a, b, c)",
        "For Python: handle exceptions where file/input errors possible",
      ],
    },
    {
      title: "General Strategy",
      col: "#a78bfa",
      items: [
        "Read question TWICE, underline the command word",
        "Marks allocated = points needed (1 mark = 1 point)",
        "Never leave blanks — attempt everything",
        "Trace tables: column per variable + output column",
        "Time: ~1 minute per mark (75 marks = 75 min budget)",
        "2021–2025 papers: patterns repeat, practice all of them",
        "Examiners want: precision, clarity, and correct terminology",
        "Watch spelling: pseudocode keywords must be exact",
      ],
    },
  ];
  const cmdWords = [
    ["Define", "Exact meaning using precise technical terms"],
    ["State", "Specific fact — no explanation required"],
    ["Describe", "Key characteristics, detailed features"],
    ["Explain", "Give reasons, cause and effect"],
    ["Compare", "Similarities AND differences between two things"],
    ["Evaluate", "Judge value/effectiveness with justification"],
    ["Calculate", "Show full working, give numerical answer"],
    ["Outline", "Brief description of main points"],
    ["Suggest", "Reasoned recommendation based on evidence"],
    ["Distinguish", "Show clear differences between two things"],
    ["Justify", "Give evidence/reasons to support a conclusion"],
    ["Discuss", "Consider multiple angles, present balanced argument"],
  ];
  return (
    <div>
      <h2
        style={{
          margin: "0 0 4px",
          fontSize: 24,
          fontWeight: 800,
          color: "#f1f5f9",
        }}
      >
        Exam Tips & Strategy
      </h2>
      <p style={{ color: "#475569", marginBottom: 28 }}>
        Based on CAIE 9618 marking schemes 2021–2025
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          marginBottom: 32,
        }}
      >
        {sections.map((s, i) => (
          <div
            key={i}
            style={{
              background: "rgba(255,255,255,0.02)",
              border: `1px solid ${s.col}22`,
              borderRadius: 16,
              padding: 20,
            }}
          >
            <h3
              style={{
                margin: "0 0 14px",
                color: s.col,
                fontFamily: "monospace",
                fontSize: 13,
              }}
            >
              {s.title}
            </h3>
            {s.items.map((t, j) => (
              <div
                key={j}
                style={{
                  display: "flex",
                  gap: 10,
                  padding: "7px 0",
                  borderBottom: `1px solid ${s.col}11`,
                }}
              >
                <span style={{ color: s.col, flexShrink: 0 }}>→</span>
                <span
                  style={{ color: "#cbd5e1", fontSize: 13, lineHeight: 1.6 }}
                >
                  {t}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 16,
          padding: 24,
        }}
      >
        <h3
          style={{
            margin: "0 0 16px",
            color: "#a78bfa",
            fontFamily: "monospace",
            fontSize: 13,
          }}
        >
          CAIE COMMAND WORDS GLOSSARY
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 10,
          }}
        >
          {cmdWords.map(([cmd, def], i) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.03)",
                borderRadius: 10,
                padding: 12,
              }}
            >
              <div
                style={{
                  color: "#f472b6",
                  fontFamily: "monospace",
                  fontSize: 13,
                  fontWeight: 700,
                  marginBottom: 4,
                }}
              >
                {cmd}
              </div>
              <div style={{ color: "#64748b", fontSize: 12, lineHeight: 1.5 }}>
                {def}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function HomePage({ onStart, progress }) {
  const done = CHAPTERS.filter((c) => progress[c.id]).length;
  const totalQs = CHAPTERS.reduce(
    (s, c) => s + c.questions.length + (c.diagramQuestions?.length || 0),
    0
  );
  return (
    <div>
      <div style={{ textAlign: "center", padding: "52px 0 36px" }}>
        <div
          style={{
            fontSize: 12,
            letterSpacing: 6,
            color: "#6d28d9",
            fontFamily: "monospace",
            marginBottom: 10,
          }}
        >
          CAMBRIDGE 9618
        </div>
        <h1
          style={{
            fontSize: 46,
            margin: "0 0 12px",
            fontWeight: 900,
            background: "linear-gradient(135deg,#f1f5f9,#a78bfa 60%,#f472b6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: 1.1,
          }}
        >
          CS Study Hub
        </h1>
        <p style={{ color: "#475569", fontSize: 16, margin: "0 0 32px" }}>
          A Level & AS Level · Cambridge 9618 · Beaconhouse Pakistan
        </p>
        <div
          style={{
            maxWidth: 360,
            margin: "0 auto 8px",
            background: "rgba(255,255,255,0.05)",
            borderRadius: 30,
            height: 6,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${(done / CHAPTERS.length) * 100}%`,
              background: "linear-gradient(90deg,#7c3aed,#a855f7,#ec4899)",
              transition: "width .5s",
            }}
          />
        </div>
        <p style={{ color: "#6d28d9", fontSize: 13, fontFamily: "monospace" }}>
          {done}/{CHAPTERS.length} chapters ·{" "}
          {Math.round((done / CHAPTERS.length) * 100)}% complete
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 12,
          marginBottom: 36,
        }}
      >
        {[
          { v: "29", l: "Chapters", c: "#a78bfa", e: "📚" },
          { v: String(totalQs) + "+", l: "Questions", c: "#4ade80", e: "❓" },
          { v: "4", l: "Papers", c: "#f472b6", e: "📄" },
          { v: "∞", l: "AI Questions", c: "#fbbf24", e: "⚡" },
        ].map((s, i) => (
          <div
            key={i}
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 14,
              padding: "20px 16px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 26, marginBottom: 4 }}>{s.e}</div>
            <div
              style={{
                fontSize: 26,
                fontWeight: 900,
                color: s.c,
                fontFamily: "monospace",
              }}
            >
              {s.v}
            </div>
            <div style={{ color: "#475569", fontSize: 12, marginTop: 4 }}>
              {s.l}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
          marginBottom: 32,
        }}
      >
        {[
          {
            code: "Paper 1 (9618/11-12)",
            time: "1h 30m",
            marks: "75",
            type: "Theory MCQ + Structured",
            col: "#4ade80",
          },
          {
            code: "Paper 2 (9618/21-22)",
            time: "2h",
            marks: "75",
            type: "Problem Solving + Pseudocode",
            col: "#4ade80",
          },
          {
            code: "Paper 3 (9618/31-32)",
            time: "1h 30m",
            marks: "75",
            type: "Advanced Theory",
            col: "#f472b6",
          },
          {
            code: "Paper 4 (9618/41-42)",
            time: "2h 30m",
            marks: "75",
            type: "Practical Programming",
            col: "#fbbf24",
          },
        ].map((p, i) => (
          <div
            key={i}
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 14,
              padding: 18,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <span
                style={{ color: p.col, fontFamily: "monospace", fontSize: 12 }}
              >
                {p.code}
              </span>
              <span
                style={{
                  color: "#fbbf24",
                  fontFamily: "monospace",
                  fontSize: 12,
                }}
              >
                {p.marks}M
              </span>
            </div>
            <p style={{ color: "#64748b", fontSize: 12, margin: "0 0 2px" }}>
              ⏱ {p.time}
            </p>
            <p style={{ color: "#475569", fontSize: 12, margin: 0 }}>
              {p.type}
            </p>
          </div>
        ))}
      </div>
      <button
        onClick={onStart}
        style={btnStyle("#7c3aed", "#a855f7", "100%", "16px 0", 16)}
      >
        Start Studying →
      </button>
    </div>
  );
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const btnStyle = (c1, c2, w = "auto", p = "10px 24px", fs = 13) => ({
  width: w,
  background: `linear-gradient(135deg,${c1},${c2})`,
  color: "white",
  border: "none",
  borderRadius: 10,
  padding: p,
  fontSize: fs,
  cursor: "pointer",
  fontFamily: "monospace",
  fontWeight: 700,
});

// ─── ROOT APP ────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [chapter, setChapter] = useState(null);
  const [progress, setProgress] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cs9618v2") || "{}");
    } catch {
      return {};
    }
  });

  const toggle = (id) => {
    const p = { ...progress, [id]: !progress[id] };
    setProgress(p);
    try {
      localStorage.setItem("cs9618v2", JSON.stringify(p));
    } catch {}
  };

  const openChapter = (ch) => {
    setChapter(ch);
    setPage("chapter");
  };

  const NAV = [
    { id: "home", label: "Home" },
    { id: "chapters", label: "Chapters" },
    { id: "tips", label: "Exam Tips" },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#080e1c",
        backgroundImage:
          "radial-gradient(ellipse at 15% 15%,rgba(109,40,217,0.07) 0%,transparent 55%),radial-gradient(ellipse at 85% 85%,rgba(236,72,153,0.04) 0%,transparent 55%)",
        fontFamily: "'Outfit',system-ui,sans-serif",
        color: "#e2e8f0",
      }}
    >
      {/* NAV */}
      <nav
        style={{
          background: "rgba(8,14,28,0.9)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          gap: 4,
          position: "sticky",
          top: 0,
          zIndex: 200,
        }}
      >
        <button
          onClick={() => {
            setPage("home");
            setChapter(null);
          }}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "15px 12px",
            marginRight: 4,
          }}
        >
          <span
            style={{
              fontFamily: "monospace",
              fontWeight: 800,
              color: "#7c3aed",
              fontSize: 15,
            }}
          >
            CS 9618
          </span>
        </button>
        {NAV.map((n) => (
          <button
            key={n.id}
            onClick={() => {
              setPage(n.id);
              setChapter(null);
            }}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "15px 14px",
              color: page === n.id && !chapter ? "#a78bfa" : "#475569",
              fontSize: 13,
              fontFamily: "monospace",
              borderBottom:
                page === n.id && !chapter
                  ? "2px solid #7c3aed"
                  : "2px solid transparent",
              transition: "all .2s",
            }}
          >
            {n.label}
          </button>
        ))}
        <div
          style={{
            marginLeft: "auto",
            color: "#4ade80",
            fontSize: 11,
            fontFamily: "monospace",
          }}
        >
          {CHAPTERS.filter((c) => progress[c.id]).length}/{CHAPTERS.length}
        </div>
      </nav>

      <main
        style={{ maxWidth: 940, margin: "0 auto", padding: "32px 20px 100px" }}
      >
        {page === "home" && !chapter && (
          <HomePage onStart={() => setPage("chapters")} progress={progress} />
        )}
        {page === "chapters" && !chapter && (
          <ChapterList
            onSelect={openChapter}
            progress={progress}
            onToggle={toggle}
          />
        )}
        {page === "tips" && !chapter && <TipsPage />}
        {chapter && (
          <ChapterDetail
            ch={chapter}
            onBack={() => {
              setChapter(null);
            }}
          />
        )}
      </main>
    </div>
  );
}
