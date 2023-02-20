import 'colors';
import express from 'express';
import * as timelineServices from '../services/timeline.service';

const router = express.Router();

router.get('/find/:id', (req, res) => {
  const data = timelineServices.getTimelineById(req.params.id);

  res.send({
    message: 'Timeline successfuly found',
    result: data,
  });
});

router.get('/find/:id/events', (req, res) => {
  const data = timelineServices.getTimelineEventById(
    req.params.id,
    req.query.eventId as string
  );

  res.status(200).send({
    message: 'Todo successfully found',
    event: data,
  });
});

router.post('/save/:id/events', (req, res) => {
  timelineServices.saveTimelineEvent(req.params.id, req.body);

  res.status(200).send({
    message: 'Timeline Event saved!',
    todo: req.body,
  });
});

router.put('/update/:id/events', (req, res) => {
  timelineServices.updateTimelineEvent(
    req.params.id,
    req.query.eventId as string,
    req.body
  );

  res.status(200).send({
    message: 'Todo saved!',
    todo: req.body,
  });
});

router.delete('/remove/:id/events', (req, res) => {
  timelineServices.deleteTimelineEvent(
    req.params.id,
    req.query.eventId as string
  );

  res.status(200).send({
    message: 'Timeline event removed',
  });
});

export default router;
