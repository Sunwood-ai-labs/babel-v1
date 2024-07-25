import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Plus, X, MoreHorizontal } from 'lucide-react';

const TaskBoard = () => {
  const [columns, setColumns] = useState({});

  useEffect(() => {
    // ダミーデータの読み込み
    const dummyData = {
      'column-1': {
        id: 'column-1',
        title: '未着手',
        tasks: [
          { id: 'task-1', content: 'デザイン作成' },
          { id: 'task-2', content: 'APIの設計' },
        ],
      },
      'column-2': {
        id: 'column-2',
        title: '進行中',
        tasks: [
          { id: 'task-3', content: 'フロントエンド開発' },
        ],
      },
      'column-3': {
        id: 'column-3',
        title: '完了',
        tasks: [
          { id: 'task-4', content: '要件定義' },
        ],
      },
    };
    setColumns(dummyData);
  }, []);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];

    if (start === finish) {
      const newTasks = Array.from(start.tasks);
      newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, start.tasks[source.index]);

      const newColumn = {
        ...start,
        tasks: newTasks,
      };

      setColumns({
        ...columns,
        [newColumn.id]: newColumn,
      });
      return;
    }

    const startTasks = Array.from(start.tasks);
    startTasks.splice(source.index, 1);
    const newStart = {
      ...start,
      tasks: startTasks,
    };

    const finishTasks = Array.from(finish.tasks);
    finishTasks.splice(destination.index, 0, start.tasks[source.index]);
    const newFinish = {
      ...finish,
      tasks: finishTasks,
    };

    setColumns({
      ...columns,
      [newStart.id]: newStart,
      [newFinish.id]: newFinish,
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-sans">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">タスクボード</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex space-x-4">
          {Object.values(columns).map((column) => (
            <div key={column.id} className="w-64">
              <div className="bg-white rounded-lg shadow-md p-4">
                <h2 className="text-lg font-semibold mb-4 text-gray-700">{column.title}</h2>
                <Droppable droppableId={column.id}>
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="min-h-[200px]"
                    >
                      {column.tasks.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="bg-gray-50 rounded p-3 mb-2 shadow-sm border border-gray-200"
                            >
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-700">{task.content}</span>
                                <MoreHorizontal size={16} className="text-gray-400" />
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
                <button className="mt-2 w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center justify-center transition duration-200">
                  <Plus size={16} className="mr-2" />
                  <span>タスクを追加</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default TaskBoard;