package mybatisUtil.Interceptor;

//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

import mybatisUtil.Dialect.Dialect;
import org.apache.ibatis.executor.statement.RoutingStatementHandler;
import org.apache.ibatis.executor.statement.StatementHandler;
import org.apache.ibatis.reflection.MetaObject;
import org.apache.ibatis.session.Configuration;
import org.apache.ibatis.session.RowBounds;
import org.apache.log4j.Logger;

import java.sql.Connection;
import java.util.Properties;
import org.apache.ibatis.plugin.Interceptor;
import org.apache.ibatis.plugin.Intercepts;
import org.apache.ibatis.plugin.Invocation;
import org.apache.ibatis.plugin.Plugin;
import org.apache.ibatis.plugin.Signature;

@Intercepts({@Signature(
        type = StatementHandler.class,
        method = "prepare",
        args = {Connection.class}
)})
public class DiclectStatementHandlerInterceptor implements Interceptor {
    private static final Logger logger = Logger.getLogger(DiclectStatementHandlerInterceptor.class);

    public DiclectStatementHandlerInterceptor() {
    }

    public Object intercept(Invocation invocation) throws Throwable {
        RoutingStatementHandler statementHandler = (RoutingStatementHandler)invocation.getTarget();
        MetaObject metaStatementHandler = MetaObject.forObject(statementHandler);
        RowBounds rowBounds = (RowBounds)metaStatementHandler.getValue("delegate.rowBounds");
        if(rowBounds != null && rowBounds.getLimit() >= 1 && rowBounds.getLimit() < 2147483647) {
            String originalSql = (String)metaStatementHandler.getValue("delegate.boundSql.sql");
            Configuration configuration = (Configuration)metaStatementHandler.getValue("delegate.configuration");
            String dialectType = null;
            if(configuration.getVariables() != null) {
                dialectType = configuration.getVariables().getProperty("dialect");
            }

            Dialect dialect = Dialect.getInstance(dialectType);
            String limit_sql = dialect.getLimitSQL(originalSql, rowBounds.getOffset(), rowBounds.getLimit());
            if(logger.isDebugEnabled()) {
                logger.debug("===>limitSql: " + limit_sql);
            }

            metaStatementHandler.setValue("delegate.boundSql.sql", limit_sql);
            metaStatementHandler.setValue("delegate.rowBounds", RowBounds.DEFAULT);
            return invocation.proceed();
        } else {
            return invocation.proceed();
        }
    }

    public Object plugin(Object target) {
        return Plugin.wrap(target, this);
    }

    public void setProperties(Properties properties) {
    }
}
