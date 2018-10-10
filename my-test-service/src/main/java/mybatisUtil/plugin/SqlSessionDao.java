package mybatisUtil.plugin;

import mybatisUtil.page.Page;
import org.apache.ibatis.executor.parameter.DefaultParameterHandler;
import org.apache.ibatis.mapping.BoundSql;
import org.apache.ibatis.mapping.MappedStatement;
import org.apache.ibatis.session.Configuration;
import org.apache.ibatis.session.RowBounds;
import org.apache.ibatis.session.SqlSession;
import org.apache.log4j.Logger;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.List;
import java.util.Map;

public class SqlSessionDao {
    private static final Logger logger = Logger.getLogger(SqlSessionDao.class);
    private SqlSession sqlSession;

    public SqlSessionDao() {
    }

    public int insert(String statement, Object parameter) throws Exception {
        if(logger.isDebugEnabled()) {
            logger.debug("===>insert: statement[" + statement + "]");
        }

        return this.getSqlSession().insert(statement, parameter);
    }

    public int update(String statement, Object parameter) throws Exception {
        if(logger.isDebugEnabled()) {
            logger.debug("===>update: statement[" + statement + "]");
        }

        return this.getSqlSession().update(statement, parameter);
    }

    public int delete(String statement, Object parameter) throws Exception {
        if(logger.isDebugEnabled()) {
            logger.debug("===>delete: statement[" + statement + "]");
        }

        return this.getSqlSession().delete(statement, parameter);
    }

    public Object selectOne(String statement, Object parameter) throws Exception {
        if(logger.isDebugEnabled()) {
            logger.debug("===>selectOne: statement[" + statement + "]");
        }

        return this.getSqlSession().selectOne(statement, parameter);
    }

    public Map<?, ?> selectMap(String statement, Object parameter, String mapKey) throws Exception {
        if(logger.isDebugEnabled()) {
            logger.debug("===>selectMap: statement[" + statement + "], mapKey[" + mapKey + "]");
        }

        return this.getSqlSession().selectMap(statement, parameter, mapKey);
    }

    public List<?> selectList(String statement, Object parameter) throws Exception {
        if(logger.isDebugEnabled()) {
            logger.debug("===>selectList: statement[" + statement + "]");
        }

        return this.getSqlSession().selectList(statement, parameter);
    }

    public Object selectFirst(String statement, Object parameter) throws Exception {
        if(logger.isDebugEnabled()) {
            logger.debug("===>selectFirst: statement[" + statement + "]");
        }

        List<?> returnList = this.selectList(statement, parameter, 0, 1);
        return returnList != null && returnList.size() != 0?returnList.get(0):null;
    }

    public List<?> selectList(String statement, Object parameter, int offset, int rows) throws Exception {
        if(logger.isDebugEnabled()) {
            logger.debug("===>selectList: statement[" + statement + "], offset[" + offset + "], rows[" + rows + "]");
        }

        return this.getSqlSession().selectList(statement, parameter, new RowBounds(offset, rows));
    }

    public <T> Page<T> selectList(String statement, Object parameter, Page<T> page) throws Exception {
        List<T> lists = (List<T>) this.selectList(statement, parameter, page.getOffset(), page.getPageSize());
        page.setResult(lists);
        page.setTotalRow(this.selectCount(statement, parameter));
        page.refresh();
        return page;
    }

    public int selectCount(String statement, Object parameter) throws Exception {
        if(logger.isDebugEnabled()) {
            logger.debug("===>selectCount: statement[" + statement + "]");
        }

        int count = 0;
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;

        try {
            MappedStatement mst = this.getMappedStatement(statement);
            BoundSql boundSql = mst.getBoundSql(parameter);
            String sql = " select count(*) total_count from (" + boundSql.getSql() + ") t_total";
            if(logger.isDebugEnabled()) {
                logger.debug("===>selectCount: sql[" + sql + "]");
            }

            conn = this.getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setQueryTimeout(mst.getTimeout().intValue());
            DefaultParameterHandler dph = new DefaultParameterHandler(mst, parameter, boundSql);
            dph.setParameters(pstmt);
            rs = pstmt.executeQuery();
            if(rs.next()) {
                count = rs.getInt("total_count");
            }

            if(logger.isDebugEnabled()) {
                logger.debug("<===selectCount: count[" + count + "]");
            }
        } catch (Exception var14) {
            logger.error("===>selectCount-error: statement[" + statement + "]", var14);
            throw new RuntimeException(var14);
        } finally {
            if(rs != null) {
                rs.close();
            }

            if(pstmt != null) {
                pstmt.close();
            }

            if(conn != null) {
                conn.close();
            }

        }

        return count;
    }

    public Connection getConnection() throws Exception {
        Configuration config = this.getConfiguration();
        return config.getEnvironment().getDataSource().getConnection();
    }

    public MappedStatement getMappedStatement(String statement) throws Exception {
        Configuration config = this.getConfiguration();
        return config.getMappedStatement(statement);
    }

    public Configuration getConfiguration() throws Exception {
        return this.getSqlSession().getConfiguration();
    }

    protected SqlSession getSqlSession() {
        return this.sqlSession;
    }

    public void setSqlSession(SqlSession sqlSession) {
        this.sqlSession = sqlSession;
    }
}

