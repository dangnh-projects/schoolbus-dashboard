import { buildRequest } from './index';

export const apiRequest = buildRequest('/');

export const getMeta = ({ url, params = {} }) => () => {
  return apiRequest.request({
    url,
    params,
  });
};

export const API = {
  getAllCourse: getMeta({ url: '/r/courses/' }),
  getCourse: getMeta({ url: '/r/courses/courses/' }),
  getMajor: getMeta({ url: '/r/courses/major/' }),
  getBatch: getMeta({ url: '/r/batches/' }),
  getFaculty: getMeta({ url: '/r/faculties/' }),
  getSubject: getMeta({ url: '/r/subjects/' }),
  getSemester: getMeta({ url: '/r/semesters/' }),
  getClassById: id => getMeta({ url: `/r/semester_classes/${id}/` }),
  getRoom: getMeta({ url: '/r/rooms/' }),
  getGroup: getMeta({ url: '/r/groups/' }),
  getPermission: getMeta({ url: '/r/permissions/', params: { limit: 1000 } }),
  getAvailableClass: getMeta({ url: '/r/subject_registration/avalable/' }),
};
