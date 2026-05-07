import React, { useEffect } from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import AOS from "aos";
import "aos/dist/aos.css";

// Contexts
import { SettingsProvider } from "./contexts/SettingsContext";
import { MobileMenuProvider } from "./contexts/MobileMenuContext";
import { AlgorithmProvider } from "./contexts/AlgorithmContext";
import { NotificationsProvider } from "./contexts/NotificationsContext";
import { ThemeProvider } from "./ThemeContext";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./ScrollToTop";
import ThreeBackground from './components/ThreeBackground';
import AIChatbot from "./components/AIChatbot";
import NotificationWidget from "./components/NotificationWidget";
import ComplexityBox from "./components/ComplexityBox";
import Doubt from "./components/Doubt";

// Pages - Main
import Home from "./pages/Home";
import About from "./components/about";
import Contact from "./components/contact";
import FAQ from "./pages/FAQ";
import CodeEditor from "./pages/CodeEditor";
import Settings from "./pages/Settings";
import Blog from "./pages/Blog";
import Quiz from "./pages/Quiz";

// Pages - Algorithms
import Sorting from "./pages/Sorting";
import SortingDoc from "./pages/SortingDoc";
import Searching from "./pages/Searching";
import SearchingOverview from "./pages/SearchingOverview";
import DataStructures from "./pages/DataStructures";
import Graph from "./pages/Graph";
import GraphBFS from "./pages/GraphBFS";
import GraphDFS from "./pages/GraphDFS";
import GraphDijkstra from "./pages/GraphDijkstra";
import GraphAStar from "./pages/GraphAStar";
import GraphCycleDetection from "./pages/GraphCycleDetection";
import GraphEulerian from "./pages/GraphEulerian.jsx";
import GraphSCC from "./pages/GraphSCC.jsx";
import BellmanFordPage from "./pages/GraphBellmanFord.jsx";
import DPOverview from "./pages/DPOverview";
import DPPage from "./pages/DPPage";
import BacktrackingOverview from "./pages/BacktrackingOverview";
import BacktrackingPage from "./pages/BacktrackingPage";
import GreedyOverview from "./pages/GreedyOverview";
import GreedyPage from "./pages/GreedyPage";
import HashingOverview from "./pages/HashingOverview";
import HashingPage from "./pages/HashingPage";
import TreeOverview from "./pages/TreeOverview";
import TreePage from "./pages/TreePage";
import DCOverview from "./pages/DCOverview";
import DCPage from "./pages/DCPage";
import GameSearchOverview from "./pages/GameSearchOverview";
import GameSearchPage from "./pages/GameSearchPage";
import BranchBoundOverview from "./pages/BranchBoundOverview";
import BranchBoundPage from "./pages/BranchBoundPage";
import StringOverview from "./pages/StringOverview";
import StringPage from "./pages/StringPage";
import StringRabinKarpPage from "./pages/StringRabinKarpPage";
import PrimPage from "./pages/PrimPage";
import KruskalPage from "./pages/KruskalPage";
import HuffmanPage from "./pages/HuffmanPage";
import FloydWarshallPage from "./pages/GraphFloydWarshall";
import BeginnerPrograms from "./pages/BeginnerPrograms";
import ClosestPair from './pages/ClosestPair';
import docClosestPair from "./pages/docClosestPair";
import ConvexHull from "./pages/ConvexHull";
import ConvexHullDoc from "./pages/ConvexHullDoc";
import ArrayLearning from "./pages/ArrayLearning";
import HeapSortDocs from "./pages/HeapSortDocs";
import RadixSortDocs from "./pages/RadixSortDocs.jsx";
import QuickSortDocs from "./pages/QuickSortDocs.jsx";
import MergeSortDocs from "./pages/MergeSortDocs.jsx";
import EditDistance from "./pages/EditDistance.jsx";

// Pages - Visualizers
import ArrayVisualizer from "./pages/Array.jsx";
import KadaneVisualizer from "./pages/Kadane.jsx";
import DijkstraVisualizer from "./pages/Dijkstra.jsx";
import DivideAndConquerVisualizer from "./pages/DivideAndConquer.jsx";
import BitManipulation from "./pages/BitManipulation.jsx";
import KMPVisualizer from "./pages/KMP";
import LinkedListPage from "./components/pages/LinkedListPage";
import Queue from "./components/Queue/Queue";
import Stack from "./components/Stack/Stack";
import BinaryTreeVisualizer from "./components/BinaryTree/BinaryTreeVisualizer";
import TrieVisualizer from "./components/Trie/TrieVisualizer";
import AlgorithmComparison from "./components/AlgorithmComparison";
import GraphComparison from "./components/GraphComparison";
import Cheatsheet from "./components/Cheatsheet";
import AlgorithmComparisonTable from './components/AlgorithmComparisonTable';
import PerformanceDashboard from "./components/PerformanceDashboard";
import PerformanceDocs from "./pages/PerformanceDocs";
import AnalyticsDashboard from "./pages/AnalyticsDashboard";
import AlgorithmRecommendationDemo from "./pages/AlgorithmRecommendationDemo";
import LearnLanding from "./pages/LearnLanding";
import DSDocumentation from "./pages/DSDocumentation";
import AlgorithmDocumentation from "./pages/Documentation";

// Pages - Legal
import PrivacyPolicy from "./components/Privacy";
import TermsOfService from "./components/terms";
import CookiePolicy from "./components/cookie-policy";

// Notes
import NotesPage from "./pages/Notes/NotesPage";
import JavaOOPS from "./pages/JavaOOPS.jsx";
import Fundamentals from "./pages/Notes/Java/Fundamentals";
import VariablesAndDataTypes from "./pages/Notes/Java/VariablesAndDataTypes";
import JavaBasics from "./pages/Notes/Java/JavaBasics";
import MERNFundamentals from "./pages/Notes/MERN/MERNFundamentals";
import PythonFundamentals from "./pages/Notes/Python/Fundamentals";
import PythonVariablesAndDataTypes from "./pages/Notes/Python/VariablesAndDataTypes";
import CppFundamentals from "./pages/Notes/Cpp/Fundamentals";
import CppVariablesAndDataTypes from "./pages/Notes/Cpp/VariablesAndDataTypes";
import CFundamentals from "./pages/Notes/C/Fundamentals";
import JavaScriptFundamentals from "./pages/Notes/JavaScript/Fundamentals.jsx";
import JavaScriptVariablesAndDataTypes from "./pages/Notes/JavaScript/VariablesAndDataTypes.jsx";
import NextJsFundamentals from "./pages/Notes/NextJs/Fundamentals.jsx";
import RustFundamentals from "./pages/Notes/Rust/Fundamentals";

// Utilities
import Playground from "./pages/Playground";
import GitLearning from "./pages/GitLearning.jsx";
import GitBasicsQuiz from "./pages/GitBasicsQuiz";
import PrimVisualizer from "./components/PrimVisualizer.jsx";

// Styles
import "./styles/components.css";
import "./styles/footer-improved.css";
import "./styles/theme.css";

const App = () => {
  const location = useLocation();

  const showComplexityBoxOn = [
    "/sorting",
    "/searching",
    "/data-structures",
    "/graph",
    "/graph/bfs",
    "/graph/dfs",
    "/graph/dijkstra",
    "/graph/astar",
    "/data-structures/stack",
  ];

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <ThemeProvider>
        <SettingsProvider>
          <MobileMenuProvider>
            <AlgorithmProvider>
              <NotificationsProvider>
                <div className="app-container">
                  <ScrollToTop />
                  <Navbar />

                  <main className="main-content page-content">
                    <Routes>
                      {/* Core Routes */}
                      <Route path="/" element={<Home />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/faq" element={<FAQ />} />
                      <Route path="/editor" element={<CodeEditor />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/blog" element={<Blog />} />
                      <Route path="/quiz" element={<Quiz />} />
                      <Route path="/playground" element={<Playground />} />
                      <Route path="/learn" element={<LearnLanding />} />
                      <Route path="/recommendations" element={<AlgorithmRecommendationDemo />} />

                      {/* Sorting */}
                      <Route path="/sorting" element={<Sorting />} />
                      <Route path="/sorting/:algoId/docs" element={<SortingDoc />} />
                      <Route path="/sorting/algorithm-comparison" element={<AlgorithmComparison />} />

                      {/* Searching */}
                      <Route path="/searching" element={<Searching />} />
                      <Route path="/searching/:id" element={<Searching />} />
                      <Route path="/searching/comparison" element={<AlgorithmComparison />} />
                      <Route path="/searchingOverview" element={<SearchingOverview />} />

                      {/* Data Structures */}
                      <Route path="/data-structures" element={<DataStructures />} />
                      <Route path="/data-structures/array" element={<ArrayVisualizer />} />
                      <Route path="/data-structures/kadane" element={<KadaneVisualizer />} />
                      <Route path="/data-structures/kmp" element={<KMPVisualizer />} />
                      <Route path="/data-structures/dijkstras" element={<DijkstraVisualizer />} />
                      <Route path="/data-structures/bitmanipulation" element={<BitManipulation />} />
                      <Route path="/data-structures/divideandconquer" element={<DivideAndConquerVisualizer />} />
                      <Route path="/data-structures/prims" element={<PrimVisualizer />} />
                      <Route path="/data-structures/linked-list" element={<LinkedListPage />} />
                      <Route path="/data-structures/queue" element={<Queue />} />
                      <Route path="/data-structures/stack" element={<Stack />} />
                      <Route path="/data-structures/binary-tree" element={<BinaryTreeVisualizer />} />
                      <Route path="/data-structures/trie" element={<TrieVisualizer />} />

                      {/* Graphs */}
                      <Route path="/graph" element={<Graph />} />
                      <Route path="/graph/bfs" element={<GraphBFS />} />
                      <Route path="/graph/dfs" element={<GraphDFS />} />
                      <Route path="/graph/dijkstra" element={<GraphDijkstra />} />
                      <Route path="/graph/astar" element={<GraphAStar />} />
                      <Route path="/graph/comparison" element={<GraphComparison />} />
                      <Route path="/graph/cycleDetection" element={<GraphCycleDetection />} />
                      <Route path="/graph/eulerianGraphs" element={<GraphEulerian />} />
                      <Route path="/graph/bellman-ford" element={<BellmanFordPage />} />
                      <Route path="/graph/sccGraphs" element={<GraphSCC />} />

                      {/* Algorithms */}
                      <Route path="/backtracking-overview" element={<BacktrackingOverview />} />
                      <Route path="/backtracking" element={<BacktrackingPage />} />
                      <Route path="/dp-overview" element={<DPOverview />} />
                      <Route path="/dp" element={<DPPage />} />
                      <Route path="/hashing-overview" element={<HashingOverview />} />
                      <Route path="/hashing" element={<HashingPage />} />
                      <Route path="/greedy-overview" element={<GreedyOverview />} />
                      <Route path="/greedy" element={<GreedyPage />} />
                      <Route path="/tree-overview" element={<TreeOverview />} />
                      <Route path="/tree" element={<TreePage />} />
                      <Route path="/dc-overview" element={<DCOverview />} />
                      <Route path="/dc" element={<DCPage />} />
                      <Route path="/game-search-overview" element={<GameSearchOverview />} />
                      <Route path="/game-search" element={<GameSearchPage />} />
                      <Route path="/branchbound-overview" element={<BranchBoundOverview />} />
                      <Route path="/branchbound" element={<BranchBoundPage />} />
                      <Route path="/string-overview" element={<StringOverview />} />
                      <Route path="/string" element={<StringPage />} />
                      <Route path="/string/rabin-karp" element={<StringRabinKarpPage />} />
                      <Route path="/prims" element={<PrimPage />} />
                      <Route path="/kruskal" element={<KruskalPage />} />
                      <Route path="/huffman" element={<HuffmanPage />} />
                      <Route path="/graph/floyd-warshall" element={<FloydWarshallPage />} />

                      {/* Documentation */}
                      <Route path="/documentation" element={<AlgorithmDocumentation />} />
                      <Route path="/data-structures-docs" element={<DSDocumentation />} />
                      <Route path="/performance/docs" element={<PerformanceDocs />} />
                      <Route path="/heap-sort-docs" element={<HeapSortDocs />} />
                      <Route path="/radix-sort-docs" element={<RadixSortDocs />} />
                      <Route path="/quick-sort-docs" element={<QuickSortDocs />} />
                      <Route path="/merge-sort-docs" element={<MergeSortDocs />} />
                      <Route path="/doc/closest-pair" element={<docClosestPair />} />
                      <Route path="/convex-hull-doc" element={<ConvexHullDoc />} />

                      {/* Performance & Analytics */}
                      <Route path="/performance" element={<PerformanceDashboard />} />
                      <Route path="/analytics" element={<AnalyticsDashboard />} />

                      {/* Notes */}
                      <Route path="/notes/:language/:topic" element={<NotesPage />} />
                      <Route path="/notes/:language" element={<Navigate to="/notes/:language/fundamentals" replace />} />
                      <Route path="/notes/java/fundamentals" element={<Fundamentals />} />
                      <Route path="/notes/java/variables-and-data-types" element={<VariablesAndDataTypes />} />
                      <Route path="/notes/java/basics" element={<JavaBasics />} />
                      <Route path="/notes/python/fundamentals" element={<PythonFundamentals />} />
                      <Route path="/notes/python/variables-and-data-types" element={<PythonVariablesAndDataTypes />} />
                      <Route path="/notes/cpp/fundamentals" element={<CppFundamentals />} />
                      <Route path="/notes/cpp/variables-and-data-types" element={<CppVariablesAndDataTypes />} />
                      <Route path="/notes/javascript/fundamentals" element={<JavaScriptFundamentals />} />
                      <Route path="/notes/javascript/variables-and-data-types" element={<JavaScriptVariablesAndDataTypes />} />
                      <Route path="/notes/nextjs/fundamentals" element={<NextJsFundamentals />} />
                      <Route path="/notes/c/fundamentals" element={<CFundamentals />} />
                      <Route path="/notes/rust/fundamentals" element={<RustFundamentals />} />
                      <Route path="/java-oops" element={<JavaOOPS />} />
                      <Route path="/notes/MERN/MERNFundamentals" element={<MERNFundamentals />} />

                      {/* Misc */}
                      <Route path="/learn/git" element={<GitLearning />} />
                      <Route path="/learn/git-basics-quiz" element={<GitBasicsQuiz />} />
                      <Route path="/cheatsheet" element={<Cheatsheet />} />
                      <Route path="/algorithm-comparison-table" element={<AlgorithmComparisonTable />} />
                      <Route path="/beginner-programs" element={<BeginnerPrograms />} />
                      <Route path="/closest-pair" element={<ClosestPair />} />
                      <Route path="/convex-hull" element={<ConvexHull />} />
                      <Route path="/dsa/array-learning" element={<ArrayLearning />} />
                      <Route path="/edit-distance" element={<EditDistance />} />

                      {/* Legal */}
                      <Route path="/privacy" element={<PrivacyPolicy />} />
                      <Route path="/terms" element={<TermsOfService />} />
                      <Route path="/cookies" element={<CookiePolicy />} />
                    </Routes>

                    {showComplexityBoxOn.includes(location.pathname) && (
                      <div style={{ marginTop: "2rem" }}>
                        <ComplexityBox />
                      </div>
                    )}
                  </main>

                  <Doubt />
                  <AIChatbot />
                  <NotificationWidget />
                  <Footer />
                  <Analytics />
                </div>
              </NotificationsProvider>
            </AlgorithmProvider>
          </MobileMenuProvider>
        </SettingsProvider>
    </ThemeProvider>
  );
};

export default App;
