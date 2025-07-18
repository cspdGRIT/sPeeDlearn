// QuickLearn - Learning Content Data
// All course content organized by topic

const learningContent = {
    python: {
        title: "Python Fundamentals",
        prerequisites: [],
        cards: [
            // Introduction & Basics (Cards 1-15)
            {
                title: "🐍 What is Python?",
                content: "Python is a <span class='highlight'>high-level programming language</span> that's as easy to read as English! Created by Guido van Rossum in 1991.",
                analogy: "Python is like a universal translator - it takes your ideas and translates them into computer language, but it's so simple that even humans can easily read it!",
                quickFacts: [
                    "Named after Monty Python's Flying Circus",
                    "Used by Google, Instagram, Spotify, Netflix",
                    "Most popular language for beginners in 2024",
                    "Interpreted language - runs line by line"
                ]
            },
            {
                title: "🎯 Why Choose Python in 2024?",
                content: "Python is the <span class='highlight'>#1 programming language</span> according to TIOBE index. It's versatile, simple, and has amazing career opportunities!",
                quickFacts: [
                    "Average Python developer salary: $95,000+",
                    "Used in AI, web dev, data science, automation",
                    "4.5 million Python developers worldwide",
                    "Cross-platform: Windows, Mac, Linux"
                ]
            },
            {
                title: "📝 Python Syntax Magic",
                content: "Python uses <span class='highlight'>indentation (spaces)</span> instead of curly braces {} to organize code. It's like organizing paragraphs in an essay!",
                code: "# Other languages:\nif (condition) {\n    doSomething();\n}\n\n# Python way:\nif condition:\n    do_something()",
                memoryTip: "Python is picky about spaces - exactly 4 spaces for each level!"
            },
            {
                title: "💻 Installing Python 2024",
                content: "Download Python from <span class='highlight'>python.org</span> - get the latest version (Python 3.12+) for the best features and security!",
                quickFacts: [
                    "Python 3.12 is the current stable version",
                    "Never use Python 2 - it's outdated",
                    "Comes with IDLE (built-in editor)",
                    "Works with VS Code, PyCharm, Jupyter"
                ]
            },
            {
                title: "🎮 Your First Python Program",
                content: "Every programmer starts with <span class='highlight'>Hello, World!</span> - it's a tradition that proves your setup works!",
                code: "# Your very first Python program\nprint('Hello, World!')\nprint('Welcome to Python!')\n\n# This will output:\n# Hello, World!\n# Welcome to Python!"
            },
            
            // Variables & Data Types (Cards 6-25)
            {
                title: "📦 Variables = Storage Boxes",
                content: "Variables are like <span class='highlight'>labeled storage boxes</span> that hold different types of data. Python figures out the type automatically!",
                code: "# Creating storage boxes\nname = 'Alice'        # Text box\nage = 25             # Number box\nheight = 5.6         # Decimal box\nis_student = True    # True/False box\n\n# Python knows the types automatically!",
                memoryTip: "Variables are case-sensitive: 'Name' ≠ 'name'"
            },
            {
                title: "🏷️ Data Types Explained",
                content: "Python has different <span class='highlight'>containers for different types of data</span>. Each type has special powers!",
                code: "# The Big Four Data Types\ntext = 'Hello World'     # str (string)\nnumber = 42             # int (integer)\nprice = 19.99           # float (decimal)\nis_ready = True         # bool (True/False)\n\n# Check types\nprint(type(text))       # <class 'str'>",
                memoryTip: "Remember SIFB - String, Integer, Float, Boolean!"
            },
            {
                title: "🔤 Strings = Text Magic",
                content: "Strings are <span class='highlight'>sequences of characters</span> - letters, numbers, symbols. Think of them as digital text!",
                code: "# Different ways to create strings\nsingle_quotes = 'Hello'\ndouble_quotes = \"World\"\nmultiline = '''This is a\nvery long\nstring'''\n\n# String concatenation\nmessage = single_quotes + ' ' + double_quotes"
            },
            {
                title: "🎯 String Operations",
                content: "Strings have <span class='highlight'>superpowers</span>! You can slice, dice, and transform them in amazing ways.",
                code: "text = 'Python Programming'\n\n# String slicing\nfirst_char = text[0]        # 'P'\nlast_char = text[-1]        # 'g'\nfirst_word = text[0:6]      # 'Python'\n\n# String methods\nprint(text.upper())         # 'PYTHON PROGRAMMING'\nprint(text.lower())         # 'python programming'"
            },
            {
                title: "🔢 Numbers in Python",
                content: "Python handles <span class='highlight'>integers and floats</span> like a mathematical genius! No need to declare types.",
                code: "# Integer math\nx = 10\ny = 3\nprint(x + y)    # 13 (addition)\nprint(x - y)    # 7 (subtraction)\nprint(x * y)    # 30 (multiplication)\nprint(x / y)    # 3.333... (division)\nprint(x // y)   # 3 (integer division)\nprint(x ** y)   # 1000 (power)"
            }
            // Note: In a real implementation, you would include all 80 cards here
            // For brevity, I'm showing the pattern with the first 10 cards
        ]
    },

    datascience: {
        title: "Data Science Essentials",
        prerequisites: ["python"],
        cards: [
            {
                title: "📊 What is Data Science?",
                content: "Data Science is like being a <span class='highlight'>detective for data</span> - you investigate numbers to solve real-world mysteries and make predictions!",
                analogy: "Imagine you're Sherlock Holmes, but instead of looking for clues at a crime scene, you're finding patterns in spreadsheets to solve business problems!",
                quickFacts: [
                    "80% of time spent cleaning data",
                    "Combines math, programming, and domain expertise", 
                    "Average salary: $120,000+ in 2024",
                    "Used by Netflix, Amazon, Google, healthcare"
                ]
            },
            {
                title: "🔄 Data Science Process",
                content: "Data science follows a <span class='highlight'>systematic process</span> from raw data to insights!",
                stepByStep: [
                    { step: 1, text: "Collect data (like gathering evidence)" },
                    { step: 2, text: "Clean data (remove errors and duplicates)" },
                    { step: 3, text: "Explore data (find patterns)" },
                    { step: 4, text: "Model data (build predictions)" },
                    { step: 5, text: "Communicate insights (tell the story)" }
                ]
            },
            {
                title: "🧰 Data Science Toolkit 2024",
                content: "Master the <span class='highlight'>essential tools</span> that data scientists use every day!",
                quickFacts: [
                    "Python: Most popular language (82% usage)",
                    "Jupyter Notebooks: Interactive coding",
                    "pandas: Data manipulation superhero", 
                    "matplotlib/seaborn: Beautiful visualizations",
                    "scikit-learn: Machine learning made easy"
                ]
            }
            // More cards would continue here...
        ]
    },

    ml: {
        title: "Machine Learning",
        prerequisites: ["python", "datascience"],
        cards: [
            {
                title: "🤖 What is Machine Learning?",
                content: "Machine Learning teaches computers to <span class='highlight'>learn patterns from examples</span>, like teaching a child to recognize animals by showing them many pictures!",
                analogy: "ML is like training a very smart student - you show them lots of examples, they find patterns, and then they can make predictions about new things they've never seen before!",
                stepByStep: [
                    { step: 1, text: "Show algorithm lots of examples (training data)" },
                    { step: 2, text: "Algorithm finds patterns automatically" },
                    { step: 3, text: "Test with new, unseen data" },
                    { step: 4, text: "Use model to make predictions" }
                ],
                quickFacts: [
                    "Powers Netflix recommendations, GPS navigation",
                    "Learns without being explicitly programmed",
                    "Gets better with more data",
                    "Average ML Engineer salary: $140,000+"
                ]
            },
            {
                title: "🏷️ Types of Machine Learning",
                content: "ML has three main flavors, like different <span class='highlight'>learning styles in school</span>:",
                stepByStep: [
                    { step: 1, text: "Supervised Learning: Learning with a teacher (has correct answers)" },
                    { step: 2, text: "Unsupervised Learning: Self-discovery (find hidden patterns)" },
                    { step: 3, text: "Reinforcement Learning: Learning by trial and error (rewards/penalties)" }
                ],
                analogy: "Supervised = Learning math with answer key | Unsupervised = Discovering patterns in a puzzle | Reinforcement = Learning to ride a bike through practice",
                quickFacts: [
                    "Supervised: Email spam detection, medical diagnosis",
                    "Unsupervised: Customer segmentation, data compression",
                    "Reinforcement: Game AI, autonomous vehicles"
                ]
            }
            // More cards would continue here...
        ]
    },

    ai: {
        title: "Artificial Intelligence", 
        prerequisites: ["python", "ml"],
        cards: [
            {
                title: "🧠 What is Artificial Intelligence?",
                content: "AI creates systems that can <span class='highlight'>think and act like humans</span> - reasoning, learning, understanding language, and recognizing images!",
                analogy: "AI is like creating a digital brain that can solve problems, make decisions, and learn from experience - just like humans do, but with computer speed and precision!",
                stepByStep: [
                    { step: 1, text: "Perceive: Take in information (see, hear, read)" },
                    { step: 2, text: "Process: Analyze and understand the data" },
                    { step: 3, text: "Reason: Make logical connections" },
                    { step: 4, text: "Act: Make decisions and take actions" },
                    { step: 5, text: "Learn: Improve from experience" }
                ],
                quickFacts: [
                    "AI powers Siri, Google Search, autonomous cars",
                    "Narrow AI: Specific tasks (chess, image recognition)",
                    "General AI: Human-level intelligence (not yet achieved)",
                    "Machine Learning is a subset of AI"
                ]
            }
            // More cards would continue here...
        ]
    },

    genai: {
        title: "Generative AI",
        prerequisites: ["python", "ml", "ai"],
        cards: [
            {
                title: "✨ What is Generative AI?",
                content: "Generative AI <span class='highlight'>creates new content</span> - text, images, music, code - like having a creative AI assistant that never runs out of ideas!",
                analogy: "Generative AI is like a super-creative artist who has studied millions of books, paintings, and songs, and can now create original content in any style you want!",
                stepByStep: [
                    { step: 1, text: "Training: Learn from millions of examples" },
                    { step: 2, text: "Understanding: Grasp patterns and styles" },
                    { step: 3, text: "Generation: Create new, original content" },
                    { step: 4, text: "Refinement: Improve based on feedback" }
                ],
                quickFacts: [
                    "Can write essays, create art, compose music",
                    "GPT, DALL-E, Midjourney are popular examples",
                    "Uses deep learning and massive datasets",
                    "Revolutionizing creative industries in 2024"
                ]
            }
            // More cards would continue here...
        ]
    },

    nlp: {
        title: "Natural Language Processing",
        prerequisites: ["python", "ml"],
        cards: [
            {
                title: "🗣️ What is NLP?",
                content: "NLP teaches computers to <span class='highlight'>understand and generate human language</span> - like giving machines the ability to read, write, and chat!",
                analogy: "NLP is like teaching a computer to be a language expert who can read books, write stories, translate languages, and have conversations!",
                quickFacts: [
                    "Powers chatbots, translation, voice assistants",
                    "Handles ambiguity and context in language",
                    "Used in sentiment analysis, summarization",
                    "Transformers revolutionized NLP (BERT, GPT)"
                ]
            }
            // More cards would continue here...
        ]
    }
};

// Prerequisites mapping for easier access
const prerequisites = {
    python: { name: "Python Basics", topics: [] },
    datascience: { name: "Data Science", topics: ["Python Basics"] },
    ml: { name: "Machine Learning", topics: ["Python Basics", "Data Science Fundamentals"] },
    ai: { name: "Artificial Intelligence", topics: ["Python Basics", "Machine Learning"] },
    genai: { name: "Generative AI", topics: ["Python Basics", "Machine Learning", "AI Fundamentals"] },
    nlp: { name: "NLP", topics: ["Python Basics", "Machine Learning"] }
};

// Export for use in other files (if using modules)
// export { learningContent, prerequisites };

// Note: In the actual implementation, each topic would have 80-120 cards
// This is a condensed version showing the structure and first few cards of each topic