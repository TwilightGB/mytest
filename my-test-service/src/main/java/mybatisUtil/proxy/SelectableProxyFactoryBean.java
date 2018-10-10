package mybatisUtil.proxy;

import org.springframework.beans.factory.FactoryBean;

public class SelectableProxyFactoryBean<T> implements FactoryBean<T> {
    private Class<?> targetInterface;
    private Object target;
    private Object proxy;
    private boolean singleton = true;
    private Class<?> dynamicProxyClass = SelectableDynamicProxy.class;

    public SelectableProxyFactoryBean() {
    }

    protected DynamicProxy<T> getDynamicProxyObject() throws Exception {
        SelectableDynamicProxy<T> dynamicProxy = (SelectableDynamicProxy)this.getDynamicProxyClass().newInstance();
        dynamicProxy.setTargetInterface(this.targetInterface);
        dynamicProxy.setTarget(this.target);
        dynamicProxy.setProxy(this.proxy);
        return dynamicProxy;
    }

    public T getObject() throws Exception {
        DynamicProxy<T> dynamicProxy = this.getDynamicProxyObject();
        return dynamicProxy.newProxy();
    }

    public Class<?> getObjectType() {
        return this.targetInterface != null?this.targetInterface:(this.target != null?this.target.getClass():Object.class);
    }

    public boolean isSingleton() {
        return this.singleton;
    }

    public void setSingleton(boolean singleton) {
        this.singleton = singleton;
    }

    public Object getTarget() {
        return this.target;
    }

    public void setTarget(Object target) {
        this.target = target;
    }

    public Class<?> getTargetInterface() {
        return this.targetInterface;
    }

    public void setTargetInterface(Class<?> targetInterface) {
        this.targetInterface = targetInterface;
    }

    public Object getProxy() {
        return this.proxy;
    }

    public void setProxy(Object proxy) {
        this.proxy = proxy;
    }

    public Class<?> getDynamicProxyClass() {
        return this.dynamicProxyClass;
    }

    public void setDynamicProxyClass(Class<?> dynamicProxyClass) {
        this.dynamicProxyClass = dynamicProxyClass;
    }
}

