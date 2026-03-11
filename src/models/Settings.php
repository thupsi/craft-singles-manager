<?php

namespace thupsi\singlesmanager\models;

use craft\base\Model;

/**
 * Plugin settings model.
 *
 * Settings are stored in the database (craft_info) and editable via the
 * native Craft section edit form (for single sections).
 */
class Settings extends Model
{
    /**
     * UIDs of single sections whose entry edit form should have the right-hand
     * meta sidebar (slug, post date, authors, etc.) hidden.
     *
     * @var string[]
     */
    public array $hideSidebarSections = [];

    /**
     * UIDs of single sections whose entry edit form should be entirely
     * read-only (no save button, no versioning, all inputs disabled).
     * Useful for instruction pages or CP dashboards.
     *
     * @var string[]
     */
    public array $readOnlySections = [];

    /**
     * Map of sectionUid → sourceKey for sections whose own source is disabled.
     * The stored source key is used to resolve the breadcrumb page when editing
     * that single (e.g. pointing to the custom source that groups it).
     *
     * @var array<string,string>
     */
    public array $breadcrumbSourceKeys = [];
}
