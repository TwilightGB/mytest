package mybatisUtil.Interceptor;

import org.apache.ibatis.executor.resultset.FastResultSetHandler;
import org.apache.ibatis.executor.resultset.ResultSetHandler;
import org.apache.ibatis.reflection.MetaObject;
import org.apache.ibatis.session.RowBounds;
import java.sql.Statement;
import java.util.Properties;
import org.apache.ibatis.plugin.Interceptor;
import org.apache.ibatis.plugin.Intercepts;
import org.apache.ibatis.plugin.Invocation;
import org.apache.ibatis.plugin.Plugin;
import org.apache.ibatis.plugin.Signature;

@Intercepts({@Signature(
        type = ResultSetHandler.class,
        method = "handleResultSets",
        args = {Statement.class}
)})
public class DiclectResultSetHandlerInterceptor implements Interceptor {
    public DiclectResultSetHandlerInterceptor() {
    }

    public Object intercept(Invocation invocation) throws Throwable {
        FastResultSetHandler resultSetHandler = (FastResultSetHandler)invocation.getTarget();
        MetaObject metaResultSetHandler = MetaObject.forObject(resultSetHandler);
        RowBounds rowBounds = (RowBounds)metaResultSetHandler.getValue("rowBounds");
        if(rowBounds != null && rowBounds.getLimit() > 0 && rowBounds.getLimit() < 2147483647) {
            metaResultSetHandler.setValue("rowBounds", RowBounds.DEFAULT);
        }

        return invocation.proceed();
    }

    public Object plugin(Object target) {
        return Plugin.wrap(target, this);
    }

    public void setProperties(Properties properties) {
    }
}
