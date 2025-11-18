import { Link } from 'react-router-dom';
import { FileText, BookOpen, Users, TrendingUp, AlertCircle, Target } from 'lucide-react';
import { getNavigationCards } from '../utils/contentLoader';

export default function HomePage() {
  const cards = getNavigationCards();

  const iconMap = {
    'overview': BookOpen,
    'project-life-cycle': TrendingUp,
    'project-meetings': Users,
    'program-management-office': Target,
    'leadership-skills': Users,
    'change-management-strategies': AlertCircle,
    'conflict-management-strategies': AlertCircle,
    'solution-architect-technology-decisions-that-impact-business': Target
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Project Mechanics
            </h1>
            <p className="text-xl sm:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto">
              Mastering the art and science of effective project management through
              structured methodologies and adaptive problem-solving
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#explore"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-white hover:bg-primary-50 transition-colors"
              >
                Explore Methodology
              </a>
              <Link
                to="/document-agent"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-primary-700 transition-colors"
              >
                <FileText className="w-5 h-5 mr-2" />
                Try Document Agent
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 leading-relaxed">
            I have spent a considerable amount of time in the field of software development,
            particularly in client delivery roles. Over the years, this experience has led me
            to develop a concept I call <strong>Project Mechanics</strong>. It's a term I coined
            to encapsulate the methodology I found effective in managing and delivering software projects.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mt-4">
            <strong>Project Mechanics</strong>, in its essence, is about understanding and applying
            a blend of structured project management techniques along with a flexible, adaptive approach
            to problem-solving. It's not about reinventing the wheel but rather about using proven
            strategies in a way that can be adapted to the specific needs and challenges of each project.
          </p>
        </div>

        {/* Deep Dive Podcast */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Deep Dive: Project Mechanics Podcast
          </h2>
          <div className="aspect-video w-full">
            <iframe
              className="w-full h-full rounded-lg"
              src="https://www.youtube.com/embed/EEFXTcARvGY?si=lhdQVcLjb28p5uJd"
              title="Deep Dive: Project Mechanics"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <p className="mt-4 text-gray-600">
            Join the deep dive podcast team in their discussion on Project Mechanics.
            The mechanics of project management, exploring both the art and the science
            behind successful project execution.
          </p>
        </div>
      </div>

      {/* Foundation Principles */}
      <div className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Foundation Principles</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            <strong>Project Mechanics</strong> is built on the foundation of clear communication,
            efficient planning, and agile response to change. It emphasizes the importance of
            understanding the project scope thoroughly, managing resources efficiently, and
            maintaining open lines of communication with all stakeholders.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            The aim of <strong>Project Mechanics</strong> is not to claim a one-size-fits-all
            solution but to offer a practical, adaptable framework that can guide project teams
            in navigating the complexities of software development and client delivery.
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-primary-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-primary-900 mb-2">Client</h3>
              <p className="text-gray-700">
                Who is receiving the output of the project
              </p>
            </div>
            <div className="bg-primary-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-primary-900 mb-2">Staff</h3>
              <p className="text-gray-700">
                Who is performing the steps necessary to complete the project objectives
              </p>
            </div>
            <div className="bg-primary-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-primary-900 mb-2">Management</h3>
              <p className="text-gray-700">
                Tracking progress and ensuring project profitability
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Explore Topics Section */}
      <div id="explore" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Explore Project Management Topics
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive guides on project management best practices, leadership skills,
            and effective methodologies for successful project delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => {
            const Icon = iconMap[card.slug] || FileText;
            return (
              <Link
                key={card.slug}
                to={`/${card.slug}`}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 group"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-primary-100 p-3 rounded-lg group-hover:bg-primary-200 transition-colors">
                    <Icon className="w-6 h-6 text-primary-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {card.description}
                    </p>
                    <span className="inline-flex items-center text-primary-600 font-medium text-sm mt-3 group-hover:gap-2 transition-all">
                      Read more →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}

          {/* Document Agent Tool Card */}
          <Link
            to="/document-agent"
            className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 group text-white"
          >
            <div className="flex items-start gap-4">
              <div className="bg-white p-3 rounded-lg">
                <FileText className="w-6 h-6 text-primary-700" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">
                  Document Agent Tool
                </h3>
                <p className="text-primary-100 text-sm">
                  AI-powered 5-step workflow for creating business documents
                  with editable outputs and collaborative refinement.
                </p>
                <span className="inline-flex items-center font-medium text-sm mt-3 group-hover:gap-2 transition-all">
                  Try the tool →
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* PMI Section */}
      <div className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Project Management Professional - PMP
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Once you know that you have a project, you need to find someone to make it happen.
            A project manager is uniquely responsible for the execution and success of the project.{' '}
            <a
              href="https://www.pmi.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-700 underline"
            >
              The Project Management Institute (PMI)
            </a>{' '}
            is the world's leading not-for-profit professional membership association.
          </p>
          <blockquote className="border-l-4 border-primary-500 pl-4 py-2 italic text-gray-700 my-6">
            "Project management is the application of knowledge, skills, tools, and techniques
            to a broad range of activities to meet the requirements of a particular project.
            Project management is comprised of five processes - Initiating, Planning, Executing,
            Controlling, and Closing - as well as nine knowledge areas."
          </blockquote>
          <p className="text-sm text-gray-600">
            — PMI, A Guide to the Project Management Body of Knowledge (PMBOK® Guide)
          </p>
        </div>
      </div>
    </div>
  );
}
