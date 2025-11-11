export const formatDueDate = (dueDateString: string | null): { text: string; className: string } => {
  if (!dueDateString) {
    return { text: '', className: '' };
  }

  const dueDate = new Date(dueDateString);
  const today = new Date();
  
  // To compare dates only, ignore time part
  dueDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffTime = dueDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    const daysOverdue = Math.abs(diffDays);
    return {
      text: `${daysOverdue} day${daysOverdue !== 1 ? 's' : ''} overdue`,
      className: 'font-bold text-red-600',
    };
  }
  
  if (diffDays === 0) {
    return {
      text: 'Due today',
      className: 'font-bold text-orange-500',
    };
  }

  if (diffDays <= 5) {
    return {
      text: `Due in ${diffDays} day${diffDays !== 1 ? 's' : ''}`,
      className: 'font-semibold text-yellow-600',
    };
  }

  return {
    text: `Due in ${diffDays} days`,
    className: 'text-gray-600',
  };
};