import { api } from './_ApiFactoryWithHeader';

export const apiMaterial = {
  getSchoolCourseMaterial: params => api.get('materials', params),

  deleteMaterial: materialId => api.delete(`materials/${materialId}`),

  createMaterial: (libraryId, data) => api.post('materials', { file: { url: data }, library: libraryId }),

  createSchoolCourseMaterial: params => api.post('materials', params),

  getSchoolCourseMaterialByLibrary: libraries => api.get(`materials/?library[in]=${libraries}&$orderby=createddate desc&$expand=file/mime_type`),
};
