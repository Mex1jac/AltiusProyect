CREATE TABLE IF NOT EXISTS product_categories (
    category_id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(120) NOT NULL,
    slug VARCHAR(140) NOT NULL,
    description TEXT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    PRIMARY KEY (category_id),
    UNIQUE KEY uq_product_categories_slug (slug),
    KEY ix_product_categories_active_sort (is_active, sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS products (
    product_id BIGINT NOT NULL AUTO_INCREMENT,
    category_id BIGINT NOT NULL,
    sku VARCHAR(64) NOT NULL,
    name VARCHAR(180) NOT NULL,
    description TEXT NULL,
    unit VARCHAR(32) NOT NULL,
    unit_price DECIMAL(12,2) NOT NULL,
    currency CHAR(3) NOT NULL DEFAULT 'MXN',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    PRIMARY KEY (product_id),
    UNIQUE KEY uq_products_sku (sku),
    KEY ix_products_category_active_name (category_id, is_active, name),
    CONSTRAINT fk_products_category FOREIGN KEY (category_id)
        REFERENCES product_categories (category_id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS product_images (
    image_id BIGINT NOT NULL AUTO_INCREMENT,
    product_id BIGINT NOT NULL,
    storage_key VARCHAR(500) NOT NULL,
    alt_text VARCHAR(250) NOT NULL DEFAULT '',
    sort_order INT NOT NULL DEFAULT 0,
    is_primary BOOLEAN NOT NULL DEFAULT FALSE,
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    PRIMARY KEY (image_id),
    KEY ix_product_images_product_sort (product_id, sort_order),
    CONSTRAINT fk_product_images_product FOREIGN KEY (product_id)
        REFERENCES products (product_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS quotes (
    quote_id BIGINT NOT NULL AUTO_INCREMENT,
    quote_number VARCHAR(40) NOT NULL,
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    PRIMARY KEY (quote_id),
    UNIQUE KEY uq_quotes_number (quote_number)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS quote_versions (
    quote_id BIGINT NOT NULL,
    version_number INT NOT NULL,
    status VARCHAR(20) NOT NULL,
    customer_name VARCHAR(180) NOT NULL,
    customer_email VARCHAR(254) NULL,
    customer_phone VARCHAR(40) NULL,
    customer_address VARCHAR(500) NULL,
    currency CHAR(3) NOT NULL DEFAULT 'MXN',
    valid_until DATE NULL,
    notes TEXT NULL,
    subtotal DECIMAL(14,2) NOT NULL,
    tax_amount DECIMAL(14,2) NOT NULL,
    total DECIMAL(14,2) NOT NULL,
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    sent_at DATETIME(6) NULL,
    PRIMARY KEY (quote_id, version_number),
    CONSTRAINT fk_quote_versions_quote FOREIGN KEY (quote_id)
        REFERENCES quotes (quote_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS quote_items (
    item_id BIGINT NOT NULL AUTO_INCREMENT,
    quote_id BIGINT NOT NULL,
    version_number INT NOT NULL,
    product_id BIGINT NULL,
    sku VARCHAR(64) NULL,
    product_name VARCHAR(180) NOT NULL,
    description TEXT NULL,
    quantity DECIMAL(12,3) NOT NULL,
    unit_price DECIMAL(12,2) NOT NULL,
    tax_rate DECIMAL(5,2) NOT NULL,
    subtotal DECIMAL(14,2) NOT NULL,
    tax_amount DECIMAL(14,2) NOT NULL,
    total DECIMAL(14,2) NOT NULL,
    PRIMARY KEY (item_id),
    KEY ix_quote_items_version (quote_id, version_number),
    KEY ix_quote_items_product (product_id),
    CONSTRAINT fk_quote_items_version FOREIGN KEY (quote_id, version_number)
        REFERENCES quote_versions (quote_id, version_number) ON DELETE CASCADE,
    CONSTRAINT fk_quote_items_product FOREIGN KEY (product_id)
        REFERENCES products (product_id) ON DELETE SET NULL,
    CONSTRAINT ck_quote_items_quantity CHECK (quantity > 0),
    CONSTRAINT ck_quote_items_price CHECK (unit_price >= 0),
    CONSTRAINT ck_quote_items_tax_rate CHECK (tax_rate >= 0 AND tax_rate <= 100)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS quote_status_history (
    history_id BIGINT NOT NULL AUTO_INCREMENT,
    quote_id BIGINT NOT NULL,
    version_number INT NOT NULL,
    from_status VARCHAR(20) NULL,
    to_status VARCHAR(20) NOT NULL,
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    note VARCHAR(500) NULL,
    PRIMARY KEY (history_id),
    KEY ix_quote_status_history_version (quote_id, version_number, history_id),
    CONSTRAINT fk_quote_status_history_version FOREIGN KEY (quote_id, version_number)
        REFERENCES quote_versions (quote_id, version_number) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;