package mybatisUtil.plugin;


public class DataSourceContext {
    public static final ThreadLocal<String> dataSourceHolder = new ThreadLocal();

    public DataSourceContext() {
    }

    public static void setDataSource(String datasource) {
        dataSourceHolder.set(datasource);
    }

    public static String getDataSource() {
        return (String)dataSourceHolder.get();
    }

    public static void removeDataSource() {
        dataSourceHolder.remove();
    }
}