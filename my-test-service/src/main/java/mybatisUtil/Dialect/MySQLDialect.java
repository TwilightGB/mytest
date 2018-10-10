package mybatisUtil.Dialect;


public class MySQLDialect extends Dialect {
    public MySQLDialect() {
    }

    public boolean supportsLimitOffset() {
        return true;
    }

    public boolean supportsLimit() {
        return true;
    }

    public String getLimitSQL(String sql, int offset, int limit) throws Exception {
        String limitSql = sql + String.format(" limit %d, %d", new Object[]{Integer.valueOf(offset), Integer.valueOf(limit)});
        return limitSql;
    }
}