/**
 * Helper functions for standardized HTTP responses
 */

export const responseHelper = {
  success: (res, data = {}, message = 'Success', statusCode = 200) => {
    return res.status(statusCode).json({
      status: 'success',
      message,
      data,
    });
  },

  error: (res, error = 'Something went wrong', statusCode = 400) => {
    return res.status(statusCode).json({
      status: 'error',
      message: typeof error === 'string' ? error : error.message || 'Error occurred',
    });
  },

  badRequest: (res, message = 'Bad Request') => {
    return res.status(400).json({ status: 'error', message });
  },

  unauthorized: (res, message = 'Unauthorized') => {
    return res.status(401).json({ status: 'error', message });
  },

  forbidden: (res, message = 'Forbidden') => {
    return res.status(403).json({ status: 'error', message });
  },

  notFound: (res, message = 'Not Found') => {
    return res.status(404).json({ status: 'error', message });
  },

  conflict: (res, message = 'Conflict') => {
    return res.status(409).json({ status: 'error', message });
  },
};
