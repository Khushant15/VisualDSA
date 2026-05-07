import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Play,
  Pause,
  RotateCcw,
  Code,
  Search as SearchIcon,
  BarChart3,
  GitBranch,
  ArrowRight,
  Sparkles,
  BookOpen,
  Target,
  Clock,
  Star,
  Share2,
  Trophy,
  Layers,
  Undo2,
  Cpu,
  Coins,
  Layout,
} from "lucide-react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import "../styles/home.css";

const TypewriterHeading = () => {
  const words = ["Visualize", "Analyze", "Understand", "Master Algorithms"];
  const [displayedWord, setDisplayedWord] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let typingSpeed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting && letterIndex < currentWord.length) {
        setDisplayedWord(currentWord.substring(0, letterIndex + 1));
        setLetterIndex(letterIndex + 1);
      } else if (isDeleting && letterIndex > 0) {
        setDisplayedWord(currentWord.substring(0, letterIndex - 1));
        setLetterIndex(letterIndex - 1);
      } else if (!isDeleting && letterIndex === currentWord.length) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && letterIndex === 0) {
        setIsDeleting(false);
        setWordIndex((wordIndex + 1) % words.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [letterIndex, isDeleting, wordIndex, words]);

  return (
    <h1 className="typewriter-heading">
      {displayedWord}
      <span className="cursor" />
    </h1>
  );
};

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  const BAR_COUNT = 12;
  const STEP_MS = 350;
  const initial = useMemo(
    () => Array.from({ length: BAR_COUNT }, () => 20 + Math.floor(Math.random() * 75)),
    []
  );

  const [values, setValues] = useState(initial);
  const [pass, setPass] = useState(0);
  const [idx, setIdx] = useState(0);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  const animRef = useRef(null);

  const cleanup = () => {
    if (animRef.current) {
      clearTimeout(animRef.current);
      animRef.current = null;
    }
  };

  const reshuffle = () => {
    const fresh = Array.from({ length: BAR_COUNT }, () => 20 + Math.floor(Math.random() * 75));
    setValues(fresh);
    setPass(0);
    setIdx(0);
    setComparisons(0);
    setSwaps(0);
    cleanup();
    animRef.current = setTimeout(tick, STEP_MS);
  };

  const tick = () => {
    setValues(currentValues => {
      const arr = [...currentValues];
      const n = arr.length;

      setPass(currentPass => {
        setIdx(currentIdx => {
          if (currentPass >= n - 1) {
            cleanup();
            animRef.current = setTimeout(reshuffle, 1000);
            return currentIdx;
          }

          if (currentIdx >= n - currentPass - 1) {
            cleanup();
            animRef.current = setTimeout(tick, STEP_MS);
            return 0;
          }

          setComparisons(c => c + 1);

          if (arr[currentIdx] > arr[currentIdx + 1]) {
            const tmp = arr[currentIdx];
            arr[currentIdx] = arr[currentIdx + 1];
            arr[currentIdx + 1] = tmp;
            setSwaps(s => s + 1);
            setValues(arr);
          }

          cleanup();
          animRef.current = setTimeout(tick, STEP_MS);
          return currentIdx + 1;
        });
        return currentPass + (idx >= n - currentPass - 1 ? 1 : 0);
      });
      return currentValues;
    });
  };

  useEffect(() => {
    if (isAnimating) {
      animRef.current = setTimeout(tick, STEP_MS);
    }
    return () => cleanup();
  }, [isAnimating]);

  const activeA = idx;
  const activeB = idx + 1;
  const sortedStart = values.length - pass;

  const features = [
    {
      icon: BarChart3,
      title: "Sorting",
      path: "/sorting",
      description: "See Bubble, Quick, Merge, Heap & more in motion.",
      badges: ["12+ algos", "Live steps", "Big-O"],
    },
    {
      icon: SearchIcon,
      title: "Searching",
      path: "/searching",
      description: "Binary, Linear, Jump, Exponential—visual & fast.",
      badges: ["8+ algos", "Trace moves", "Compare runs"],
    },
    {
      icon: BookOpen,
      title: "Documentation",
      path: "/documentation",
      description: "Complete algorithm reference with complexity analysis.",
      badges: ["50+ algos", "Details", "Examples"],
    },
    {
      icon: GitBranch,
      title: "Data Structures",
      path: "/data-structures",
      description: "Lists, Trees, Stacks, Queues, Graphs—built up.",
      badges: ["15+ types", "Ops demo", "Memory view"],
    },
    {
      icon: Share2,
      title: "Graph Algorithms",
      path: "/graph",
      description: "BFS, DFS, Dijkstra, A*, and more on custom graphs.",
      badges: ["Build graph", "Path trace", "Weights"],
    },
    {
      icon: Layers,
      title: "Dynamic Programming",
      path: "/dp",
      description: "Recursive subproblems visualized—LCS, Knapsack, and more.",
      badges: ["Tabulation", "Memoization", "Optimizations"],
    },
    {
      icon: Undo2,
      title: "Backtracking",
      path: "/backtracking",
      description: "Exploration through trial and error—N-Queens, Sudoku, etc.",
      badges: ["Search tree", "Pruning", "Solvers"],
    },
    {
      icon: Coins,
      title: "Greedy Algorithms",
      path: "/greedy",
      description: "Local optimal choices—Huffman coding, Fractional Knapsack.",
      badges: ["Optimal", "Heuristics", "Fast"],
    },
    {
      icon: Cpu,
      title: "Bit Manipulation",
      path: "/data-structures/bitmanipulation",
      description: "The magic of bits—XOR tricks, shifting, and fast math.",
      badges: ["Fast", "Low-level", "Masking"],
    },
    {
      icon: Layout,
      title: "Algorithm Comparison",
      path: "/algorithm-comparison-table",
      description: "Side-by-side complexity and performance analysis.",
      badges: ["Benchmarks", "Tables", "Stats"],
    },
  ];

  const recentUpdates = [
    { type: "new", title: "VisualDSA Tutor AI", description: "Your personal algorithm coach is live.", time: "Just now" },
    { type: "update", title: "Midnight Theme", description: "New premium dark blue aesthetic applied.", time: "2h ago" },
    { type: "feature", title: "Quick Sort Guide", description: "Interactive step-by-step pivots.", time: "1d ago" },
  ];

  const learningPaths = [
    {
      title: "Complete Beginner",
      duration: "2–3 weeks",
      desc: "Start with basic sorting and searching algorithms",
    },
    {
      title: "Intermediate Developer",
      duration: "4–6 weeks",
      desc: "Dive into advanced algorithms and data structures",
    },
    {
      title: "Algorithm Expert",
      duration: "8–12 weeks",
      desc: "Master complex algorithms and optimization techniques",
    },
  ];

  return (
    <div className="home-dashboard">
      <TypewriterHeading />
      
      <section className="hero-section" data-aos="fade-up">
        <div className="hero-container">
          <div className="hero-grid">
            <div className="demo-panel" data-aos="zoom-in" data-aos-duration="1500">
              <div className="demo-header">
                <div className="live-badge">
                  <div className="pulse-dot" />
                  <strong>Live Demo</strong>
                </div>
                <span>Bubble Sort · {values.length} bars</span>
              </div>

              <div className="demo-chart">
                {values.map((h, i) => {
                  const isActive = i === activeA || i === activeB;
                  const isSorted = i >= sortedStart;
                  return (
                    <div
                      key={i}
                      className={`bar ${isActive ? 'active' : ''} ${isSorted ? 'sorted' : ''}`}
                      style={{ height: `${h}%` }}
                    />
                  );
                })}
              </div>

              <div className="demo-controls">
                <div className="control-group">
                  <span>Pass {Math.min(pass + 1, values.length - 1)}</span>
                  <button onClick={() => setIsAnimating(!isAnimating)}>
                    {isAnimating ? <Pause size={12} /> : <Play size={12} />}
                    {isAnimating ? "Pause" : "Play"}
                  </button>
                  <button onClick={reshuffle}>
                    <RotateCcw size={12} />
                    Reset
                  </button>
                </div>
                <div className="stats-group">
                  <span className="comparisons">Comparisons: {comparisons}</span>
                  <span className="swaps">Swaps: {swaps}</span>
                </div>
              </div>
            </div>

            <div className="hero-content" data-aos="fade-up" data-aos-delay="200">
              <div className="hero-badge">
                <Sparkles size={14} />
                <span>Premium Algorithm Lab</span>
              </div>

              <h2 className="hero-title">
                Master Algorithms Through Visual Learning
              </h2>

              <p className="hero-subtitle">
                Learn by seeing. Trace every step, compare complexity, and build intuition fast with our interactive visualization engine.
              </p>

              <div className="hero-actions">
                <Link to="/learn" className="btn-primary-new"><Play size={16} />Start Learning</Link>
                <Link to="/quiz" className="btn-secondary-new"><Trophy size={16} />Take a Quiz</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="content-grid-container" data-aos="fade-up">
        <section className="resources-grid">
          <h2 className="section-heading">Resources</h2>
          <div className="features-list">
            {features.map((feature, index) => (
              <Link key={index} to={feature.path} className="feature-card">
                <div className="feature-card-header">
                  <feature.icon size={28} />
                  <div className="feature-badges">
                    {feature.badges.map((badge, bIdx) => (
                      <span key={bIdx} className="feature-badge">{badge}</span>
                    ))}
                  </div>
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.description}</p>
                <div className="feature-footer">
                  <span>Explore Now</span>
                  <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="learning-paths">
          <h2 className="section-heading">Learning Paths</h2>
          {learningPaths.map((path, index) => (
            <div key={index} className="path-card">
              <div className="path-text">
                <span className="path-title">{path.title}</span>
                <p className="path-desc">{path.desc}</p>
                <div className="path-duration">{path.duration}</div>
              </div>
            </div>
          ))}
        </section>

        <section className="updates-feed">
          <h2 className="section-heading">Recent Updates</h2>
          <div className="updates-list">
            {recentUpdates.map((update, index) => (
              <div key={index} className="update-item">
                <div className={`update-icon ${update.type}`}>
                  {update.type === "new" && <Sparkles size={16} />}
                  {update.type === "update" && <Code size={16} />}
                  {update.type === "feature" && <Star size={16} />}
                </div>
                <div className="update-content">
                  <h4>{update.title}</h4>
                  <p>{update.description}</p>
                  <span className="update-time">{update.time}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
