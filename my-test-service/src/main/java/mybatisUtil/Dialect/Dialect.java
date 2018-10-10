package mybatisUtil.Dialect;

import org.apache.log4j.Logger;

import java.util.HashMap;
import java.util.Map;

public abstract class Dialect {
    protected final Logger logger = Logger.getLogger(this.getClass());
    private static Map<String, Dialect> instances = new HashMap();

    public Dialect() {
    }

    public boolean supportsLimit() {
        return false;
    }

    public boolean supportsLimitOffset() {
        return false;
    }

    public abstract String getLimitSQL(String var1, int var2, int var3) throws Exception;

    public static Dialect getInstance(String clazzName) throws Exception {
        Dialect dialect = (Dialect)instances.get(clazzName);
        if(dialect == null) {
            dialect = newInstance(clazzName);
            instances.put(clazzName, dialect);
        }

        return dialect;
    }

    public static Dialect newInstance(String clazzName) throws Exception {
        return (Dialect)new MySQLDialect();
    }
}

