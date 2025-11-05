import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { Tooltip } from 'react-tooltip';

const Heatmap = ({ heatmapData }) => {
  const today = new Date();
  const startDate = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());

  const formattedData = heatmapData.map(item => ({
    date: item.date,
    count: item.count,
  }));

  const getColorScale = (count) => {
    if (count === 0) return 'color-empty';
    if (count < 3) return 'color-scale-1';
    if (count < 6) return 'color-scale-2';
    if (count < 10) return 'color-scale-3';
    return 'color-scale-4';
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Submission Heatmap</h3>
      <div className="overflow-x-auto">
        <CalendarHeatmap
          startDate={startDate}
          endDate={today}
          values={formattedData}
          classForValue={(value) => {
            if (!value) return 'color-empty';
            return getColorScale(value.count);
          }}
          tooltipDataAttrs={(value) => {
            if (!value || !value.date) {
              return null;
            }
            return {
              'data-tooltip-id': 'heatmap-tooltip',
              'data-tooltip-content': `${value.date}: ${value.count} submissions`,
            };
          }}
        />
        <Tooltip id="heatmap-tooltip" />
      </div>
    </div>
  );
};

export default Heatmap;
