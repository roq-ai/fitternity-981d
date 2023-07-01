import axios from 'axios';
import queryString from 'query-string';
import { DayPassInterface, DayPassGetQueryInterface } from 'interfaces/day-pass';
import { GetQueryInterface } from '../../interfaces';

export const getDayPasses = async (query?: DayPassGetQueryInterface) => {
  const response = await axios.get(`/api/day-passes${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createDayPass = async (dayPass: DayPassInterface) => {
  const response = await axios.post('/api/day-passes', dayPass);
  return response.data;
};

export const updateDayPassById = async (id: string, dayPass: DayPassInterface) => {
  const response = await axios.put(`/api/day-passes/${id}`, dayPass);
  return response.data;
};

export const getDayPassById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/day-passes/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteDayPassById = async (id: string) => {
  const response = await axios.delete(`/api/day-passes/${id}`);
  return response.data;
};
