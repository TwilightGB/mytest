package mybatisUtil.proxy;

import java.io.Serializable;

public interface DynamicProxy<T> extends Serializable {
    T newProxy() throws Exception;
}