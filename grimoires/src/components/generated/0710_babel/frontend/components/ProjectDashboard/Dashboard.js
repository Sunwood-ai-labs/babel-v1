import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, BarChart2, Bell } from 'lucide-react';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    // ダミーデータの設定
    setProjects([
      { id: 1, name: '和風SaaSプロジェクト', progress: 75 },
      { id: 2, name: 'モダン料理アプリ', progress: 30 },
    ]);

    setTasks([
      { id: 1, title: 'デザイン作成', status: 'todo' },
      { id: 2, title: 'バックエンド開発', status: 'in-progress' },
      { id: 3, title: 'テスト実施', status: 'done' },
    ]);

    setTeamMembers([
      { id: 1, name: '山田太郎', timezone: 'Asia/Tokyo' },
      { id: 2, name: 'John Doe', timezone: 'America/New_York' },
    ]);
  }, []);

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData('taskId', taskId);
  };

  const handleDrop = (e, status) => {
    const taskId = e.dataTransfer.getData('taskId');
    const updatedTasks = tasks.map(task => 
      task.id === parseInt(taskId) ? { ...task, status } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-sans">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">プロジェクトダッシュボード</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {projects.map(project => (
          <div key={project.id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">{project.name}</h2>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-green-600 h-2.5 rounded-full" style={{width: `${project.progress}%`}}></div>
            </div>
            <p className="mt-2 text-sm text-gray-600">進捗: {project.progress}%</p>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">タスク管理</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['todo', 'in-progress', 'done'].map(status => (
            <div 
              key={status} 
              className="bg-gray-100 p-4 rounded-md"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, status)}
            >
              <h3 className="text-lg font-medium mb-2 capitalize">{status}</h3>
              {tasks.filter(task => task.status === status).map(task => (
                <div 
                  key={task.id} 
                  className="bg-white p-2 mb-2 rounded shadow cursor-move"
                  draggable
                  onDragStart={(e) => handleDragStart(e, task.id)}
                >
                  {task.title}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Calendar className="mr-2" /> ガントチャート
          </h2>
          <div className="h-40 bg-gray-200 rounded flex items-center justify-center">
            ガントチャートの実装
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Clock className="mr-2" /> チームメンバーのタイムゾーン
          </h2>
          <ul>
            {teamMembers.map(member => (
              <li key={member.id} className="mb-2">
                {member.name} - {member.timezone}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Users className="mr-2" /> リソース管理
          </h2>
          <div className="h-40 bg-gray-200 rounded flex items-center justify-center">
            リソース管理の実装
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <BarChart2 className="mr-2" /> レポートと分析
          </h2>
          <div className="h-40 bg-gray-200 rounded flex items-center justify-center">
            レポートと分析の実装
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Bell className="mr-2" /> 通知とリマインダー
          </h2>
          <ul>
            <li className="mb-2">プロジェクトAの締め切りが近づいています</li>
            <li className="mb-2">新しいタスクが割り当てられました</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;