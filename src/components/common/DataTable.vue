<template>
  <div class="table-wrapper">
    <table class="table">
      <thead>
        <tr>
          <th v-for="column in columns" :key="column.key">{{ column.label }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row[idKey]">
          <td v-for="column in columns" :key="column.key">
            <slot :name="column.key" :row="row">
              {{ row[column.key] ?? '—' }}
            </slot>
          </td>
        </tr>
        <tr v-if="!rows.length">
          <td :colspan="columns.length" class="empty">
            <slot name="empty">No records</slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
export interface TableColumn<T> {
  key: keyof T & string;
  label: string;
}

withDefaults(
  defineProps<{
    columns: TableColumn<Record<string, unknown>>[];
    rows: Record<string, any>[];
    idKey?: string;
  }>(),
  { idKey: 'id' }
);
</script>

<style scoped lang="scss">
.empty {
  text-align: center;
  padding: 2rem 0;
  color: #94a3b8;
}
</style>
