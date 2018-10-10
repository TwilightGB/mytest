package mybatisUtil.plugin;

import mybatisUtil.proxy.SelectableProxyFactoryBean;

public class SqlSessionProxyFactoryBean<T> extends SelectableProxyFactoryBean<T> {
    private Class<?> dynamicProxyClass = SqlSessionDynamicProxy.class;

    public SqlSessionProxyFactoryBean() {
    }

    public Class<?> getDynamicProxyClass() {
        return this.dynamicProxyClass;
    }

    public void setDynamicProxyClass(Class<?> dynamicProxyClass) {
        this.dynamicProxyClass = dynamicProxyClass;
    }
}