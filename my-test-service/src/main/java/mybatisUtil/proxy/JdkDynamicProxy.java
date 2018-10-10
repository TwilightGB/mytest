package mybatisUtil.proxy;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;
import org.apache.log4j.Logger;

public class JdkDynamicProxy<T> implements DynamicProxy<T>, InvocationHandler {
    private static final long serialVersionUID = -4707843773530388910L;
    protected final Logger logger = Logger.getLogger(this.getClass());
    private Class<?> targetInterface;
    private Object target;

    public JdkDynamicProxy() {
    }

    public T newProxy() throws Exception {
        return (T) (this.targetInterface != null?newProxy((Class)this.targetInterface, this):newProxy((Object)this.target, this));
    }

    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        return null;
    }

    public static Object newProxy(Object target, InvocationHandler invocationHandler) throws Exception {
        if(target != null && invocationHandler != null) {
            return newProxyInstance(target.getClass().getClassLoader(), target.getClass().getInterfaces(), invocationHandler);
        } else {
            throw new IllegalArgumentException("newProxy: this argument is required; it must not be null");
        }
    }

    public static Object newProxy(Class<?> targetInterface, InvocationHandler invocationHandler) throws Exception {
        if(targetInterface != null && invocationHandler != null) {
            Class<?>[] interfaces = new Class[]{targetInterface};
            return newProxyInstance(targetInterface.getClassLoader(), interfaces, invocationHandler);
        } else {
            throw new IllegalArgumentException("newProxy: this argument is required; it must not be null");
        }
    }

    public static Object newProxyInstance(ClassLoader loader, Class<?>[] interfaces, InvocationHandler h) throws Exception {
        return Proxy.newProxyInstance(loader, interfaces, h);
    }

    protected Object getTarget() {
        return this.target;
    }

    public void setTarget(Object target) {
        this.target = target;
    }

    protected Class<?> getTargetInterface() {
        return this.targetInterface;
    }

    public void setTargetInterface(Class<?> targetInterface) {
        this.targetInterface = targetInterface;
    }
}
