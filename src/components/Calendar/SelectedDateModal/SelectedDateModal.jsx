import { useState, useEffect } from "react";
import Modal from '../../common/Modal/Modal';
import ScheduleCreationCard from './ScheduleCreationCard';
import CategoryContentCard from './CategoryContentCard';
import ScheduleListCard from './ScheduleListCard';
import ScheduleEditCard from './ScheduleEditCard';
import PriorityListCard from './PriorityListCard';
import { getCalendarEventsByDate } from "../../../apis/calendar";
import dayjs from "dayjs";

function SelectedDateModal({ selectedDate, onClose, selectedCategory, onCategoryChange, categories }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("list");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedEventType, setSelectedEventType] = useState(null);

  if (!selectedDate) return null;

  const fetchDayEvents = async () => {
    setLoading(true);
    setError(null);

    try {
      const dateStr = dayjs(selectedDate).format("YYYY-MM-DDTHH:mm:ss");
      const dayEvents = await getCalendarEventsByDate(dateStr);

      if (Array.isArray(dayEvents)) {
        const sortedEvents = dayEvents.sort((a, b) => (a.priority || 999) - (b.priority || 999));
        setEvents(sortedEvents);
      } else {
        setEvents([]);
      }
    } catch (error) {
      setError("일정을 불러오는데 실패했습니다.");
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      fetchDayEvents();
      setViewMode("list");
      setSelectedEvent(null);
      setSelectedEventType(null);
    }
  }, [selectedDate]);

  const handleCloseModal = () => {
    if (onCategoryChange) onCategoryChange(null);
    setViewMode("list");
    setSelectedEvent(null);
    setSelectedEventType(null);
    onClose();
  };

  const handleBack = () => {
    setViewMode("list");
    setSelectedEvent(null);
    setSelectedEventType(null);
    if (onCategoryChange) onCategoryChange(null);
  };

  const handleEventTypeClick = (eventType) => {
    const eventsOfType = events.filter(event => event.eventType === eventType);
    setSelectedEventType(eventType);
    setViewMode("detail");
    if (eventsOfType.length > 0) {
      setSelectedEvent(eventsOfType[0]);
    }
  };

  const handleCreateNew = (category) => {
    if (onCategoryChange) onCategoryChange(category);
  };

  return (
    <Modal onClose={onClose}>
      <ScheduleCreationCard
        selectedDate={selectedDate}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={handleCreateNew}
        onClose={handleCloseModal}
      />

      {selectedCategory && (
        <CategoryContentCard
          selectedCategory={selectedCategory}
          selectedDate={selectedDate}
          onClose={handleCloseModal}
        />
      )}

      {!selectedCategory && viewMode !== "detail" && (
        <ScheduleListCard
          events={events}
          loading={loading}
          error={error}
          onEventTypeClick={handleEventTypeClick}
        />
      )}

      {viewMode === "detail" && (
        <ScheduleEditCard
          selectedEventType={selectedEventType}
          selectedEvent={selectedEvent}
          selectedDate={selectedDate}
          onBack={handleBack}
          onClose={handleCloseModal}
        />
      )}

      {!selectedCategory && viewMode === "list" && events.length > 0 && (
        <PriorityListCard
          events={events}
          selectedDate={selectedDate}
          onPriorityUpdate={fetchDayEvents}
        />
      )}
    </Modal>
  );
}

export default SelectedDateModal;