package mybatisUtil.plugin;

import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;
public class RoutingDataSource extends AbstractRoutingDataSource {
    private boolean disable = false;

    public RoutingDataSource() {
    }

    protected Object determineCurrentLookupKey() {
        if(this.isDisable()) {
            this.logger.info("determineCurrentLookupKey: disable is true,return null!");
            return null;
        } else {
            String key = DataSourceContext.getDataSource();
            if(this.logger.isDebugEnabled()) {
                this.logger.debug("determineCurrentLookupKey: key[" + key + "]");
            }

            return key;
        }
    }

    public boolean isDisable() {
        return this.disable;
    }

    public void setDisable(boolean disable) {
        this.disable = disable;
    }
}

