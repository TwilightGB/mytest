package mybatisUtil.proxy;


import mybatisUtil.annotation.ProxyMethod;

import java.lang.reflect.Method;

public class SelectableDynamicProxy<T> extends JdkDynamicProxy<T> {
    private static final long serialVersionUID = 8161802516489884307L;
    protected static final Class<ProxyMethod> PROXY_METHOD_CLASS = ProxyMethod.class;
    private Object proxy;
    private Class<?> proxyClass = null;

    public SelectableDynamicProxy() {
    }

    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        Object result = null;
        this.logger.debug("proxy invoke begin...");
        ProxyMethod pm = (ProxyMethod)method.getAnnotation(PROXY_METHOD_CLASS);
        if(pm == null) {
            result = this.invokeTarget(proxy, method, args);
        } else {
            result = this.invokeProxy(proxy, method, args, pm);
        }

        this.logger.debug("proxy invoke end!");
        return result;
    }

    protected Object invokeTarget(Object proxy, Method method, Object[] args) throws Throwable {
        return method.invoke(this.getTarget(), args);
    }

    protected Object invokeProxy(Object proxy, Method method, Object[] args, ProxyMethod proxyMethod) throws Throwable {
        Method proxy_m = this.getProxyMethod(method, proxyMethod);
        return this.invokeProxyMethod(proxy, method, args, proxy_m);
    }

    protected Object invokeProxyMethod(Object proxy, Method method, Object[] args, Method proxyMethod) throws Throwable {
        return proxyMethod.invoke(this.getProxy(), args);
    }

    protected Method getProxyMethod(Method method, ProxyMethod proxyMethod) throws Throwable {
        String proxy_method_name = this.getProxyMethodName(proxyMethod);
        Class<?>[] proxy_param_types = proxyMethod.parameterTypes();
        Method proxy_m = null;
        if(proxy_method_name != null && proxy_method_name.length() >= 1) {
            if(proxy_param_types != null && proxy_param_types.length >= 1) {
                proxy_m = this.getProxyMethod(proxy_method_name, proxy_param_types);
            } else {
                proxy_m = this.getProxyMethod(proxy_method_name, method.getParameterTypes());
            }
        } else if(proxy_param_types != null && proxy_param_types.length >= 1) {
            proxy_m = this.getProxyMethod(method.getName(), proxy_param_types);
        } else {
            proxy_m = method;
        }

        return proxy_m;
    }

    protected String getProxyMethodName(ProxyMethod proxyMethod) throws Exception {
        String proxy_method_name = proxyMethod.name();
        if(proxy_method_name == null || proxy_method_name.length() < 1) {
            this.logger.info("getProxyMethodName: proxyMethod.name() is empty, return proxyMethod.value()!");
            proxy_method_name = proxyMethod.value();
        }

        return proxy_method_name;
    }

    protected Method getProxyMethod(String name, Class... parameterTypes) throws Exception {
        return this.getProxyClass().getMethod(name, parameterTypes);
    }

    protected Class<?> getProxyClass() {
        if(this.proxyClass == null) {
            this.proxyClass = this.getProxy().getClass();
        }

        return this.proxyClass;
    }

    protected Object getProxy() {
        return this.proxy;
    }

    public void setProxy(Object proxy) {
        this.proxy = proxy;
    }
}
