package mybatisUtil.plugin;

import mybatisUtil.annotation.Statement;
import mybatisUtil.proxy.SelectableDynamicProxy;

import java.lang.reflect.Method;


public class SqlSessionDynamicProxy<T> extends SelectableDynamicProxy<T> {
    private static final long serialVersionUID = 3065367307556563483L;
    protected static final Class<String> STRING_CLASS = String.class;
    protected static final Class<Statement> STATEMENT_CLASS = Statement.class;
    private static final String SQLID_SEPARATOR = ".";

    public SqlSessionDynamicProxy() {
    }

    protected Object invokeProxyMethod(Object proxy, Method method, Object[] args, Method proxyMethod) throws Throwable {
        Statement statement = (Statement)method.getAnnotation(STATEMENT_CLASS);
        if(statement == null) {
            this.logger.info("invokeProxyMethod: statement is null, use the input args.");
            return proxyMethod.invoke(this.getProxy(), args);
        } else {
            int argsIndex = statement.argsIndex();
            String argsValue = this.getStatementId(statement);
            Object[] args_new = this.buildArgs(args, argsIndex, argsValue);
            return proxyMethod.invoke(this.getProxy(), args_new);
        }
    }

    protected String getStatementId(Statement stat) throws Exception {
        if(stat == null) {
            return null;
        } else if(stat.value() != null && stat.value().length() > 0) {
            return stat.value();
        } else {
            StringBuilder s = new StringBuilder();
            if(stat.namespace() != null && stat.namespace().length() > 0) {
                s.append(stat.namespace()).append(".");
            }

            s.append(stat.sqlId());
            return s.toString();
        }
    }

    protected Object[] buildArgs(Object[] args, int argsIndex, Object argsValue) throws Exception {
        Object[] args_new = null;
        if(args != null && args.length != 0) {
            if(argsIndex < 0 || argsIndex > args.length) {
                throw new RuntimeException("Statement argsIndex out of args.length!");
            }

            args_new = new Object[args.length + 1];
            args_new[argsIndex] = argsValue;
            int new_index = 0;

            for(int i = 0; i < args.length; ++i) {
                if(i == argsIndex) {
                    ++new_index;
                }

                args_new[new_index] = args[i];
                ++new_index;
            }
        } else {
            args_new = new Object[]{argsValue};
        }

        return args_new;
    }
}

