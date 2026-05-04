import React, { useState } from 'react';
import { ChevronDown, ChevronRight, HelpCircle } from 'lucide-react';
import '../styles/faq.css';

const FAQ = () => {
  const [openAccordions, setOpenAccordions] = useState({});

  const toggleAccordion = (index) => {
    setOpenAccordions(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const faqData = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "What is VisualDSA, and how does it help in learning algorithms?",
          answer: "VisualDSA is an interactive web application designed to help users visualize and understand various sorting, searching, and graph algorithms in real-time. It provides step-by-step visual representations that make complex algorithmic concepts easier to understand, perfect for students, educators, and anyone interested in computer science fundamentals."
        },
        {
          question: "Is VisualDSA free to use?",
          answer: "Yes! VisualDSA is completely free. You can use all features without any cost, and there are no advertisements or premium subscriptions required."
        }
      ]
    },
    {
      category: "Features & Functionality",
      questions: [
        {
          question: "Can I run the visualizations step by step?",
          answer: "Yes! VisualDSA provides step-by-step visualization controls. You can pause, play, and navigate through each step of the algorithm execution. This allows you to understand exactly what happens at each stage of the algorithm's operation."
        },
        {
          question: "Is there a way to adjust the speed of algorithm visualization?",
          answer: "Absolutely! Each visualizer includes speed controls that let you adjust the animation speed from very slow (for detailed study) to fast (for quick overviews). You can customize the speed to match your learning pace and preferences."
        },
        {
          question: "What are the main features of VisualDSA?",
          answer: "Key features include: • Real-time algorithm visualization • Interactive step-by-step controls • Speed adjustment options • Performance statistics (comparisons, swaps, execution time) • Export capabilities (GIFs, videos, snapshots) • Responsive design for all devices • Educational tools perfect for classrooms and tutorials"
        },
        {
          question: "Can I export or record visualizations?",
          answer: "Yes! You can export visualizations as GIFs, record them as videos, or take snapshots. This is perfect for presentations, sharing with others, or including in educational materials."
        }
      ]
    },
    {
      category: "Algorithms & Coverage",
      questions: [
        {
          question: "Does VisualDSA cover all sorting, searching, and graph algorithms?",
          answer: "VisualDSA covers many fundamental algorithms including: Sorting: Bubble Sort, Insertion Sort, Selection Sort, Merge Sort, Quick Sort, Heap Sort, and more. Searching: Linear Search, Binary Search, Jump Search, Exponential Search. Graph Algorithms: BFS, DFS, Dijkstra's Algorithm. We're continuously adding new algorithms based on user feedback and contributions."
        },
        {
          question: "Which algorithms are currently supported?",
          answer: "Currently supported algorithms include:\n\n**Sorting Algorithms:**\n• Bubble Sort, Insertion Sort, Selection Sort\n• Merge Sort, Quick Sort, Heap Sort\n• Radix Sort, Tim Sort, Shell Sort\n\n**Searching Algorithms:**\n• Linear Search, Binary Search\n• Jump Search, Exponential Search, Ternary Search\n\n**Graph Algorithms:**\n• Breadth-First Search (BFS), Depth-First Search (DFS)\n• Dijkstra's Shortest Path Algorithm\n\n**Data Structures:**\n• Linked Lists, Binary Trees, Binary Search Trees\n• Stacks, Queues"
        },
        {
          question: "What are sorting algorithms?",
          answer: "Sorting algorithms are methods for rearranging a collection of items (like numbers or names) into a specific order, such as ascending or descending. They are fundamental to computer science and are used in many applications. VisualDSA helps you understand how different sorting methods work through visual demonstrations."
        },
        {
          question: "What are searching algorithms?",
          answer: "Searching algorithms are designed to find and retrieve a specific element from a data structure. The efficiency of a search algorithm depends heavily on whether the data is sorted. VisualDSA demonstrates various searching techniques and their performance characteristics."
        }
      ]
    },

    {
      category: "Technical & Learning",
      questions: [
        {
          question: "What are graphs in data structures?",
          answer: "A graph is a non-linear data structure consisting of nodes (or vertices) and edges that connect pairs of nodes. They are used to model relationships between objects, such as social networks, computer networks, or road maps. VisualDSA provides interactive graph algorithm demonstrations to help you understand these concepts."
        },
        {
          question: "Can you recommend resources to study algorithms?",
          answer: "Great learning resources include:\n\n**Online Platforms:**\n• GeeksforGeeks and Programiz for tutorials\n• LeetCode and HackerRank for practice problems\n• Coursera and edX for structured courses\n\n**Books:**\n• 'Introduction to Algorithms' by Cormen, Leiserson, Rivest, and Stein\n• 'Algorithms' by Robert Sedgewick and Kevin Wayne\n\n**Practice:**\n• Use VisualDSA to understand algorithm behavior\n• Solve coding problems on competitive programming platforms\n• Build your own implementations"
        },
        {
          question: "Is this suitable for beginners?",
          answer: "Absolutely! VisualDSA is designed to be beginner-friendly while also being valuable for advanced users. The visual representations make complex concepts easier to understand, and the step-by-step controls let you learn at your own pace."
        }
      ]
    }
  ];

  return (
    <div className="faq-container">
      <div className="faq-header">
        <div className="faq-title-section">
          <HelpCircle className="faq-icon" size={48} />
          <h1 className="faq-title">Frequently Asked Questions</h1>
          <p className="faq-subtitle">
            Find answers to common questions about VisualDSA, its features, and how to get started.
          </p>
        </div>
      </div>

      <div className="faq-content">
        {faqData.map((category, categoryIndex) => (
          <div key={categoryIndex} className="faq-category">
            <h2 className="faq-category-title">{category.category}</h2>
            <div className="faq-questions">
              {category.questions.map((faq, questionIndex) => {
                const accordionKey = `${categoryIndex}-${questionIndex}`;
                const isOpen = openAccordions[accordionKey];
                
                return (
                  <div key={questionIndex} className="faq-item">
                    <button 
                      className={`faq-question ${isOpen ? 'active' : ''}`}
                      onClick={() => toggleAccordion(accordionKey)}
                      aria-expanded={isOpen}
                    >
                      <span className="faq-question-text">{faq.question}</span>
                      <div className="faq-chevron">
                        {isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                      </div>
                    </button>
                    
                    <div className={`faq-answer ${isOpen ? 'open' : ''}`}>
                      <div className="faq-answer-content">
                        {faq.answer.split('\n').map((paragraph, pIndex) => (
                          <p key={pIndex}>{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="faq-footer">
        <div className="faq-footer-content">
          <h3>Still have questions?</h3>
          <p>Can't find what you're looking for? Try our FAQ chatbot for instant answers, check out our documentation, or contact us directly.</p>
          <div className="faq-footer-actions">
            <a href="/documentation" className="faq-footer-link">
              View Documentation
            </a>
            <a href="/contact" className="faq-footer-link">
              Contact Us
            </a>
            <a href="https://github.com/Khushant15/VisualDSA" target="_blank" rel="noopener noreferrer" className="faq-footer-link">
              GitHub Repository
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
