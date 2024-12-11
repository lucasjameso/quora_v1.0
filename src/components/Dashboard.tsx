import React from 'react';
import { BarChart3, FileText, Search, Clock, Bookmark, TrendingUp } from 'lucide-react';
import { UserMetrics, RecentActivity, SavedSearch } from '../types';

interface DashboardProps {
  metrics: UserMetrics;
  recentActivity: RecentActivity[];
  savedSearches: SavedSearch[];
}

export function Dashboard({ metrics, recentActivity, savedSearches }: DashboardProps) {
  return (
    <div className="p-8 space-y-12 max-w-7xl mx-auto overflow-y-auto h-full">
      {/* Section Title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-100">Dashboard Overview</h1>
        <p className="text-gray-400 mt-2">Monitor your compliance analysis and activity</p>
      </div>

      {/* Metrics Overview */}
      <section className="space-y-6">
        <h2 className="text-lg font-semibold text-gray-300">Key Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-xl bg-[#1C1C1C] border border-[#2A2A2A] hover:border-blue-500/20 transition-colors">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-blue-500/10">
                <Search className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Queries This Month</p>
                <p className="text-2xl font-semibold text-gray-100">{metrics.queriesThisMonth}</p>
              </div>
            </div>
          </div>
          
          <div className="p-6 rounded-xl bg-[#1C1C1C] border border-[#2A2A2A] hover:border-purple-500/20 transition-colors">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-purple-500/10">
                <FileText className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Documents Analyzed</p>
                <p className="text-2xl font-semibold text-gray-100">{metrics.documentsAnalyzed}</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-[#1C1C1C] border border-[#2A2A2A] hover:border-green-500/20 transition-colors">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-green-500/10">
                <Bookmark className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Saved Searches</p>
                <p className="text-2xl font-semibold text-gray-100">{metrics.savedSearches}</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-[#1C1C1C] border border-[#2A2A2A] hover:border-orange-500/20 transition-colors">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-orange-500/10">
                <TrendingUp className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Analysis Trend</p>
                <p className="text-2xl font-semibold text-gray-100">+24%</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-[#2A2A2A] my-8"></div>

      {/* Activity and Saved Searches */}
      <section className="space-y-6">
        <h2 className="text-lg font-semibold text-gray-300">Activity Overview</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="p-6 rounded-xl bg-[#1C1C1C] border border-[#2A2A2A] hover:border-blue-500/20 transition-colors">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-100">Recent Activity</h3>
              <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-[#2A2A2A] transition-colors group">
                  <div className="p-2 rounded-lg bg-[#2A2A2A] group-hover:bg-[#333333]">
                    {activity.type === 'search' ? (
                      <Search className="w-4 h-4 text-blue-400" />
                    ) : activity.type === 'view' ? (
                      <FileText className="w-4 h-4 text-purple-400" />
                    ) : (
                      <BarChart3 className="w-4 h-4 text-green-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-300 truncate">{activity.title}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(activity.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                  {activity.category && (
                    <span className="px-2 py-1 text-xs rounded-full bg-[#2A2A2A] text-gray-400 group-hover:bg-[#333333]">
                      {activity.category}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Saved Searches */}
          <div className="p-6 rounded-xl bg-[#1C1C1C] border border-[#2A2A2A] hover:border-blue-500/20 transition-colors">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-100">Saved Searches</h3>
              <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                Manage
              </button>
            </div>
            <div className="space-y-4">
              {savedSearches.map((search) => (
                <div key={search.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-[#2A2A2A] transition-colors group">
                  <div className="p-2 rounded-lg bg-[#2A2A2A] group-hover:bg-[#333333]">
                    <Clock className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-300 truncate">{search.query}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(search.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                  <button className="px-3 py-1.5 text-xs rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors">
                    Run Again
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-[#2A2A2A] my-8"></div>

      {/* Quick Actions */}
      <section className="space-y-6">
        <h2 className="text-lg font-semibold text-gray-300">Quick Actions</h2>
        <div className="p-6 rounded-xl bg-[#1C1C1C] border border-[#2A2A2A]">
          <div className="flex flex-wrap gap-4">
            <button className="px-4 py-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors">
              New Analysis
            </button>
            <button className="px-4 py-2 rounded-lg bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 transition-colors">
              Export Report
            </button>
            <button className="px-4 py-2 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors">
              Schedule Review
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}