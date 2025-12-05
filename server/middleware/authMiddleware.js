import jwt from 'jsonwebtoken';

/**
 * Middleware to verify JWT token
 */
export const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // normalize token payload: some code expects userId, others expect id
    req.user = {
      ...decoded,
      userId: decoded.userId || decoded.id || decoded._id,
      id: decoded.id || decoded.userId || decoded._id,
    };
    next();
  } catch (error) {
    console.error('Token verification error:', error.message);
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

/**
 * Optional token verification (doesn't fail if no token)
 */
export const optionalVerifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = {
        ...decoded,
        userId: decoded.userId || decoded.id || decoded._id,
        id: decoded.id || decoded.userId || decoded._id,
      };
    }
    next();
  } catch (error) {
    console.error('Optional token verification error:', error.message);
    next();
  }
};
